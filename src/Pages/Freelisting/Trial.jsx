
import React, { useState } from 'react';

import Sell from './Sell';
import Job from './Jobpage';

function Trial() {
  const [componentToShow, setComponentToShow] = useState(null);

  const handleButtonClick = (component) => {
    setComponentToShow(component);
  };

  return (
    <main>
			<div class="container margin_60_35">
				<div class="row">
					<div class="col-lg-3" id="desktop_view">
						<div class="nav profile-side-menu  flex-column nav-pills" id="v-pills-tab" role="tablist"
							aria-orientation="vertical">
        <button onClick={() => handleButtonClick('sell')}>Sell</button>
        <button onClick={() => handleButtonClick('job')}>Job</button>
      </div>
      </div>
     <div class="col-lg-9 px_remove"  id="create_listing">
                        <div class="tab-content profile-sidebar-content" id="v-pills-tabContent">           
        {componentToShow === 'sell' && <Sell />}
        {componentToShow === 'job' && <Job />}
      </div>
                     </div>
                </div>  
            </div>      
        </main>   
  );
}

export default Trial;