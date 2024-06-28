import React, { useState } from "react";
import user from '../../FrontEnd/img/listing-img.jpeg'


function Bookmark() {
  return (
    <div>
        <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <div className="add-review">
                  <h5>Bookmark</h5>
                  <div className='list_general'>
                    <div class="li">
						<div className="profile">
							<figure className="circular-image"><img src={user} alt=""/></figure> 
							<div className="profile-details">
								<small>Web Development</small>
						<h4>Creative Concept interior contractor Pvt. Ltd.</h4>
						<p>Lorem ipsum dolor sit amet, est ei idque voluptua copiosae, pro
						detracto disputando reformidans at, ex vel suas eripuit. Vel alii
						zril maiorum ex, mea id sale eirmod epicurei. Sit te possit
						senserit, eam alia veritus maluisset ei, id cibo vocent ocurreret
						per....</p>
						<p><a href="Individual-listing.html" class="btn_1 gray"><i
									class="fa fa-fw fa-eye"></i> View item</a></p>

							</div>
						</div>
						
						<ul class="buttons">
							<li><a href="#0" class="btn_1 gray delete wishlist_close"><i
										class="fa fa-fw fa-times-circle-o"></i> Cancel</a></li>
						</ul>
					</div>
                  </div>
                 
                </div>
              </div>
    </div>
  )
}

export default Bookmark