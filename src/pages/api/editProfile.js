import { PrismaClient } from "@prisma/client";
import authMiddleware from "./middleware";
import multer from "multer";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./aws-config";
import sharp from 'sharp';

const upload = multer({
  storage: multer.memoryStorage(),
  dest: "uploads/",
});

const prisma = new PrismaClient();

const handler = async (req, res) => {
  const { user } = req;

  try {
    const { bio, designation, name, facebook, instagram, twitter, linkedin } = req.body;

    const foundUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!foundUser) {
      return res.status(400).json({ message: "Cannot find a user with this id!" });
    }

    if (req.file) {
      if (foundUser.img) {
        const deleteParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: foundUser.img,
        };
        await s3Client.send(new DeleteObjectCommand(deleteParams));
      }

      const processedImage = await sharp(req.file.buffer)
        .resize(150, 150) 
        .toBuffer();

      const uniqueUrl = `${foundUser.name}-profile-icon-${foundUser.id}_${req.file.originalname}`;
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: uniqueUrl,
        Body: processedImage,
        ContentType: req.file.mimetype,
      };

      const command = new PutObjectCommand(params);
      await s3Client.send(command);

      await prisma.user.update({
        where: { id: user.id },
        data: { img: uniqueUrl },
      });
    }

    if (name && foundUser.name !== name) {
      await prisma.user.update({
        where: { id: user.id },
        data: { name },
      });
    }
    if (bio && foundUser.bio !== bio) {
      await prisma.user.update({
        where: { id: user.id },
        data: { bio },
      });
    }

    if (designation && foundUser.designation !== designation) {
      await prisma.user.update({
        where: { id: user.id },
        data: { designation },
      });
    }
    
    if (facebook && foundUser.facebook !== facebook) {
      await prisma.user.update({
        where: { id: user.id },
        data: { facebook },
      });
    }

    if (instagram && foundUser.instagram !== instagram) {
      await prisma.user.update({
        where: { id: user.id },
        data: { instagram },
      });
    }

    if (twitter && foundUser.twitter !== twitter) {
      await prisma.user.update({
        where: { id: user.id },
        data: { twitter },
      });
    }

    if (linkedin && foundUser.linkedin !== linkedin) {
      await prisma.user.update({
        where: { id: user.id },
        data: { linkedin },
      });
    }

    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    res.json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
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

const ProfileImageUploader = (req, res) => {
  middleware(req, res);
};

export default ProfileImageUploader;

export const config = {
  api: {
    bodyParser: false,
  },
};
