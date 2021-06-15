function Art({ art, correctArt }) {
  console.log("correctArt: ", correctArt);
  console.log(art);

  return (
    <div className="art-container">
      <img src={correctArt.primaryImageSmall} alt="art file" />
      <p>{correctArt.artistDisplayName}</p>
    </div>
  );
}

export default Art;
