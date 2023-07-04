import { useState, useEffect } from "react";
import privacyData from "../data/privacy/privacyData.json";
import HeadTitle from "../common/elements/head/HeadTitle";
import HeaderOne from "../common/elements/header/HeaderOne";
import { getAllPosts } from "../../lib/api";
// Use the prisma object to interact with your database
const PrivacyPolicy = ({ me, users, allPosts }) => {

  
  
  console.log(me)
  
  return (
    <>
    <HeadTitle pageTitle="Privacy Policy"/>
    <HeaderOne postData={allPosts} pClass="header-light header-sticky header-with-shadow"/>
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="content">
              <div className="inner">
                <div className="section-title">
                  <h4 className="title">{privacyData.publishedDate}</h4>
                </div>
                <div>
                  <h3>GDPR compliance</h3>
                  <p>{privacyData.gdprCompliance}</p>
                </div>
                <div>
                  <h3>About Blogar</h3>
                  <p>{privacyData.aboutBlogar}</p>
                </div>
                <div>
                  <h3>When we collect personal data about you</h3>
                  <p>{privacyData.whenCollectPersonalData}</p>
                </div>
                <div>
                  <h3>Why we collect and use personal data</h3>
                  <p>{privacyData.whyCollectPersonalData}</p>
                </div>
                <div>
                  <h3>Type of personal data collected</h3>
                  <p>{privacyData.typeOfPersonalData}</p>
                </div>
                <div>
                  <h3>Information we collect automatically</h3>
                  <p>{privacyData.informationCollectedAutomatically}</p>
                </div>
                <div>
                  <h3>The use of cookies and web beacons</h3>
                  <p>{privacyData.useOfCookies}</p>
                </div>
                <div>
                  <h3>How long we keep your data</h3>
                  <p>{privacyData.dataRetention}</p>
                </div>
                <div>
                  <h3>Your rights to your personal data</h3>
                  <p>{privacyData.rightsToPersonalData}</p>
                </div>
                <div>
                  <h3>Hotjar’s privacy policy</h3>
                  <p>{privacyData.hotjarPrivacyPolicy}</p>
                </div>
                <div>
                  <h3>Changes to this Privacy Policy</h3>
                  <p>{privacyData.changesToPrivacyPolicy}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;

export async function getServerSideProps() {
  try {
    const response = await fetch('http://localhost:3000/api/users');
    const users = await response.json();
    const allPosts = getAllPosts(["title", "featureImg", "slug", "cate"]);

    return {
      props: {
        users,
        allPosts,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        users: [],
        allPosts: [],
      },
    };
  }
}

