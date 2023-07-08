import Link from "next/link";
import Image from "next/image";

const WidgetCategory = ({ catData }) => {

  const categoryData = [
    { name: "Design", slug: "Design" },
    { name: "SEO", slug: "SEO" },
    { name: "Travel", slug: "Travel" },
    { name: "Research", slug: "Research" },
  ];

  return (
    <div className="axil-single-widget widget widget_categories mb--30">
      <ul>
        {categoryData.map((category) => (
          <li className="cat-item" key={category.slug}>
            <Link href={`/category?fil=${category.slug}`}>
              <a className="inner">
                <div className="thumbnail">
                  <Image
                    src='/images/posts/thumbnail-01.webp'
                    alt={category.name}
                    height={50}
                    width={50}
                    priority={true}
                  />
                </div>
                <div className="content">
                  <h5 className="title">{category.name}</h5>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetCategory;
