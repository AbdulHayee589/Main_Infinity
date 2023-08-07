const ProductDescription = ({ description = "" }) => {
  const cleanDescription = description.replace(/<[^>]*>/g, "");

  return (
    <div id="description">
      <h1 className="text-2xl font-bold mb-6">About</h1>

      <div className="grid gap-6">
        <p>
          {cleanDescription.substring(
            0,
            description.indexOf(".:") - 5
          )}
        </p>
        <div className="grid">
          {cleanDescription
            .substring(cleanDescription.indexOf(".:"))
            .split(".:")
            .filter((el) => el != "")
            .map((el) => (
              <div key={el} className="flex gap-2">
                <span className="h-full">&#x2022;</span>
                <span>{el}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default ProductDescription;