const Movie: React.FC = () => {
  return (
    <>
      <div>
        <img
          src="https://picsum.photos/200/300"
          alt="Movie poster thumbnail"
          style={{ width: "150px", height: "150px" }}
        />
        <h3>Movie Title here</h3>
        <p>Year released here</p>
        <p>Genre (make li as chips?) </p>
        <hr />
      </div>
    </>
  );
};
export default Movie;
