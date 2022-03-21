const indexes = [];
for (let i = 0; i < 23; i++) indexes.push(i + 1);

export const About = (props) => {
  return (
    <div id="about">
      <div className="container">
        <div className="col-md-8 col-md-offset-2">
          <p className="title text-center">{props.data.title}</p>
          <p
            className="content"
            dangerouslySetInnerHTML={{ __html: props.data.content }}
          />
        </div>
        <div
          className="col-md-12 carousel"
          data-flickity='{"wrapAround": true, "autoPlay": true}'
        >
          {indexes.map((index) => (
            <img
              key={"" + index}
              src={`img/phantz/carousel/${index}.jpeg`}
              alt=""
            />
          ))}
        </div>
      </div>
    </div>
  );
};
