function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function fetchArt(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  const objectIds = [];

  for (let i = 0; i < 40; i++) {
    // makes sure all object ids are unique
    const objectID = data.objectIDs.splice(
      Math.floor(Math.random() * data.objectIDs.length),
      1
    )[0];
    objectIds.push(objectID);
  }
  console.log("objectIds:", objectIds);

  return Promise.all(
    objectIds.map(async (id) => {
      const res = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
      );
      const data = await res.json();
      return data;
    })
  );
}

export { shuffleArray, fetchArt };
