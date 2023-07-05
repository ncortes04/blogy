import React from 'react'
import LoginForm from '../common/components/login/login-form'
import HeaderOne from '../common/elements/header/HeaderOne'

const login = ({allPosts}) => {
  return (
    <>
        <HeaderOne postData={allPosts} Class="header-light header-sticky header-with-shadow"/>
        <LoginForm/>
    </>
  )
}

export default login

export async function getServerSideProps() {
    try {
      const allPosts = getAllPosts(["title", "featureImg", "slug", "cate"]);
      return {
        props: {
          allPosts,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        props: {
          allPosts: [],
        },
      };
    }
  }
  