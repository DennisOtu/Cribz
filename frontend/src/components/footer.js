const Footer = () => {

    return (
        <div style={{height: '40vh', background: 'var(--footerBlue)', color: 'white', paddingTop: '2em', paddingInline: '4em', display: 'flex', flex: 'row', justifyContent: 'space-between'}}>
            <div className="d-flex flex-column col-lg-3">
                <h6 style={{fontFamily: 'var(--fontSerif)', color: 'var(--cribzYellow)'}}>Cribz</h6>
                <p>Praesent tincidunt posuere dolor, nec bibendum tellus suscipit a. Nullam pellentesque felis id porttitor scelerisque.
                </p>
            </div>
            <div><h6 style={{fontFamily: 'var(--fontSerif)'}}>Discover</h6></div>
            <div><h6 style={{fontFamily: 'var(--fontSerif)'}}>About</h6></div>
            <div><h6 style={{fontFamily: 'var(--fontSerif)'}}>Help</h6></div>
            <div><h6 style={{fontFamily: 'var(--fontSerif)'}}>Follow Us</h6></div>
        </div>
  
    )
  }
  
export default Footer
  
