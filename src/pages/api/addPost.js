import { PrismaClient } from "@prisma/client";
import authMiddleware from "./middleware";
import dotenv from "dotenv";
import multer from "multer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./aws-config";
import sharp from "sharp";

const upload = multer({
  storage: multer.memoryStorage(),
  dest: "uploads/",
});

const prisma = new PrismaClient();

const handler = async (req, res) => {
  const { user } = req;
  try {
    const foundUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!foundUser) {
      return res.status(400).json({ message: "Cannot find a user with this id!" });
    }

    const { title, content, brief, category, readTime } = req.body;

    const images = [];
    const sizes = [
      { width: 100, height: 100, attribute: "iconImg" },
      { width: 300, height: 250, attribute: "featureImg" },
      { width: 500, height: 500, attribute: "bannerImg" },
    ];

    if (req.file) {
      for (const size of sizes) {
        const processedImage = await sharp(req.file.buffer)
          .resize(size.width, size.height)
          .toBuffer();

        const uniqueUrl = `${foundUser.name}-post-image-${foundUser.id}_${req.file.originalname}_${title}_${size.attribute}`;
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: uniqueUrl,
          Body: processedImage,
          ContentType: req.file.mimetype,
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        images.push({ attribute: size.attribute, url: uniqueUrl });
      }
    }

    const postData = {
      name: title,
      description: content,
      brief,
      category,
      read_time: readTime,
      user: { connect: { id: req.user.id } },
    };

    if (images.length > 0) {
      for (const image of images) {
        postData[image.attribute] = image.url;
      }
    }

    const newPost = await prisma.post.create({
      data: postData,
    });

    res.status(200).json({ message: "success" });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  } finally {
    await prisma.$disconnect();
  }
};

const middleware = (req, res) => {
  return new Promise((resolve, reject) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error uploading file" });
      }
      resolve();
    });
  })
    .then(() => {
      return new Promise((resolve, reject) => {
        authMiddleware(handler)(req, res, resolve);
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    });
};

const postImageUploader = (req, res) => {
  middleware(req, res);
};

export default postImageUploader;

export const config = {
  api: {
    bodyParser: false,
  },
};
