export const Roadmap = (props) => (
  <div id='roadmap'>
    <div className='container'>
      <p className='title text-center'>Roadmap</p>
      {props.data.map((item, index) => (
        <div key={index} className='col-md-8 col-md-offset-2'>
          <p
            className='content'
            style={{
              textDecoration: item.content.includes('Completed')
                ? 'line-through'
                : 'none',
            }}
          >
            {item.content}
          </p>
        </div>
      ))}
    </div>
    <div id='footer'>
      <div className='container text-center'>
        <p>&copy; Tuum.Tech Copyright</p>
      </div>
    </div>
  </div>
);
