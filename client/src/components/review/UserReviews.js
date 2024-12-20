const UserReviews = ({ wines }) => {
  return (
    <div>
      {wines && wines.length > 0 ? (
        wines.map((wine, index) => {
          // Destructure safely
          const { comment } = wine || {}; // Prevent destructuring errors

          return (
            <div key={index}>
              <h3>Wine {index + 1}</h3>
              <p>{comment || "No comment available"}</p>
              {/* Render other properties of wine */}
            </div>
          );
        })
      ) : (
        <p>No wines to display</p>
      )}
    </div>
  );
};
export default UserReviews