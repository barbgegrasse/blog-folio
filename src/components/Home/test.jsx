class Listing extends Component {  
    render() {    
        const {      
            listing: {
                title,        
                type,        location: {          city,          state,          country        }      }    } = this.props;