import Link from "next/link";
import Image from "next/image";
import topics from "../../../data/trendingtops";
const WidgetCategory = ({ catData }) => {
  return (
    <div className="axil-single-widget widget widget_categories mb--30">
      <ul>
        {topics.slice(0, 4).map((data) => (
          <li className="cat-item" key={data.category}>
            <Link href={`/category?fil=${data.category}`}>
              <a className="inner">
                <div className="thumbnail">
                  <Image
                    src={data.cate_img}
                    alt={data.cate}
                    height={50}
                    width={50}
                    priority={true}
                  />
                </div>
                <div className="content">
                  <h5 className="title">{data.category}</h5>
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
