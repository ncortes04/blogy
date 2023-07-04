import Link from "next/link";
import Image from "next/image";
import { SectionTitleTwo } from "../../elements/sectionTitle/SectionTitle";
import {removeDuplicates, slugify} from '../../utils';

const CategoryList = ({cateData}) => {

  const uniqueCategory = removeDuplicates(cateData, "cate");
    
  return (
    <div className="axil-categories-list axil-section-gap bg-color-grey">
      <div className="container">
        <SectionTitleTwo title="Trending Topics" btnText="See All Topics"/>
        <div className="row">
          <div className="col-lg-12">
            <div className="list-categories d-flex flex-wrap">
              {uniqueCategory.slice(0, 6).map((data, index) => (
                <div className="single-cat" key={index}>
                <div className="inner">
                <Link href={`/category/${slugify(data.cate)}`}>
                  <a>
                    <div className="thumbnail">
                    <Image
                        src={data.cate_img}
                        alt={data.cate}
                        height={180}
                        width={180}
                    />
                    </div>
                    <div className="content">
                      <h5 className="title">{data.cate}</h5>
                    </div>
                  </a>
                  </Link>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
