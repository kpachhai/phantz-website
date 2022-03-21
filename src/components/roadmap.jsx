export const Roadmap = (props) => (
  <div id="roadmap">
    <div className="container">
      <p className="title text-center">Roadmap</p>
      {props.data.map((item, index) => (
        <div key={index} className="col-md-8 col-md-offset-2">
          <p className="header">{item.header}</p>
          <p
            className="content"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      ))}
    </div>
    <div id="footer">
      <div className="container text-center">
        <p>
          &copy; Tuum.Tech Copyright
        </p>
      </div>
    </div>
  </div>
);
