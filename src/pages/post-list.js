import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import InstagramOne from "../common/components/instagram/InstagramOne";
import HeaderOne from "../common/elements/header/HeaderOne";
import SidebarOne from "../common/components/sidebar/SidebarOne";
import PostLayoutTwo from "../common/components/post/layout/PostLayoutTwo";
import HeadTitle from "../common/elements/head/HeadTitle";
import FooterTwo from '../common/elements/footer/FooterTwo';

const PostListPage = ({ allPosts, popularPosts}) => {

    const [blogs] = useState(allPosts);
    const [pageNumber, setPageNumber] = useState(0);

    const blogsPerPage = 5;
    const pageVisited = pageNumber * blogsPerPage;
    
    const pageCount = Math.ceil(blogs.length / blogsPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    return (
        <>
        <HeadTitle pageTitle="Post Archive" />
            <HeaderOne postData={allPosts} pClass="header-light header-sticky header-with-shadow" />
            <div className="axil-post-list-area axil-section-gap bg-color-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-xl-8">
                            <PostLayoutTwo dataPost={allPosts} show={pageVisited + blogsPerPage} postStart={pageVisited} />

                            <ReactPaginate
                                previousLabel={<i className="fas fa-arrow-left"></i>}
                                nextLabel={<i className="fas fa-arrow-right"></i>}
                                pageCount= {pageCount}
                                onPageChange={changePage}
                                containerClassName={"pagination"}
                                previousLinkClassName={"prev"}
                                nextLinkClassName={"next"}
                                disabledClassName={"disabled"}
                                activeClassName={"current"}
                            />
                        </div>
                        <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
                            <SidebarOne popular={popularPosts} dataPost={allPosts} />
                        </div>
                    </div>
                </div>
            </div>
            <InstagramOne parentClass="bg-color-grey" />
            <FooterTwo />
        </>
    );
}

export default PostListPage;


export async function getServerSideProps(context) {
    try {
      const response = await fetch("http://localhost:3000/api/posts/getAllPosts");
      const allPosts = await response.json();
      const popular = await fetch("http://localhost:3000/api/posts/getAnalytics");
      const data = await popular.json();
      return {
        props: {
          allPosts,
          popularPosts: data,

        },
      };
    } catch (error) {
      console.error(error);
  
      return {
        props: {
          popularPosts: [],
          post: {},
        },
      };
    }
  }