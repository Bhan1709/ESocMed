import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

const timeToString = (timestamp) => {
    TimeAgo.addDefaultLocale(en);
    const timeAgo = new TimeAgo("en-US");
    const date = new Date(timestamp).getTime();
    console.log(timeAgo.format(Date.now() - date));
    return timeAgo.format(Date.now() - date);
}

export default timeToString;