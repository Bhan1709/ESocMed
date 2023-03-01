import Like from "components/Like";


const LikesWidget = ({ likes }) => {
    return (<>
        {likes.map(userId => (
            <Like
                key={userId}
                userId={userId}
            />
        ))}
    </>);
}

export default LikesWidget;