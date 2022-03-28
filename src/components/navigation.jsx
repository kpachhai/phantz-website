export const Navigation = (props) => (
  <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
    <div className='container'>
      <div className='navbar-header'>
        <button
          type='button'
          className='navbar-toggle collapsed'
          data-toggle='collapse'
          data-target='#bs-example-navbar-collapse-1'
        >
          {' '}
          <span className='sr-only'>Toggle navigation</span>{' '}
          <span className='icon-bar'></span> <span className='icon-bar'></span>{' '}
          <span className='icon-bar'></span>{' '}
        </button>
        <a className='navbar-brand page-scroll' href='#page-top'>
          <img src='img/logo.png' alt='logo' />
        </a>{' '}
      </div>

      <div className='social text-center'>
        {/* <a href={props.data.discord} alt="discord">
          <img src="img/discord.png" alt="discord" />
        </a> */}
        <a href={props.data.twitter} alt='twitter'>
          <img src='img/twitter.png' alt='twitter' />
        </a>
      </div>

      <div
        className='collapse navbar-collapse'
        id='bs-example-navbar-collapse-1'
      >
        <ul className='nav navbar-nav navbar-right'>
          <li>
            <a href='#roadmap' className='page-scroll'>
              Roadmap
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);
