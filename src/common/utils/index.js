import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon'

const slugify = function(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
}

function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject  = {};

  for(var i in originalArray) {
     lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for(i in lookupObject) {
      newArray.push(lookupObject[i]);
  }
   return newArray;
}
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleString([], options);
};

const SortingByDate = function(posts) {
  return posts
  .sort((post1, post2) => {

    const beforeDate = DateTime.fromFormat(post1.date, "LLL dd yyyy");
    const afterDate = DateTime.fromFormat(post2.date, "LLL dd yyyy");
    return afterDate - beforeDate;
    
})
}
const getLoggedInStatus = () => {
  if (typeof window !== 'undefined') {
    const loggedInStatus = window.localStorage.getItem('id_token');
    if (loggedInStatus) {
      return true;
    }
  }
  return false;
};
const isServer = () => typeof window === "undefined";


const HoverActiveClass = function(hoverRef) {
	const [refLists, setrefLists] = useState([]);
	
	useEffect(() => {
		const refContainer = hoverRef.current.childNodes;
		setrefLists(refContainer);
	}, []);

	refLists.forEach((f) => {
		f.addEventListener("mouseenter", function () {
			refLists.forEach((e) => {
				var div = e.querySelector(".content-block");
				div.classList.add("axil-control");
				div.classList.remove("is-active");
			});
			this.querySelector(".content-block").classList.add("is-active");
		})
	});
}


export {formatTimestamp,isServer, getLoggedInStatus, slugify, removeDuplicates, SortingByDate, HoverActiveClass};