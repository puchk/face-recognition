import React from 'react';
import './ImageLink.css';


const ImageLink = () => {
	return (
		<div>
			<p className='f3'>
				{'This will detect faces in your pictures'}
			</p>
			<div className='center'>
				<div className='pa4 br3 shadow-5 center'>
					<input className='f4 pa2 w-70 center' type='text' />
					<button className='w-30 grow f4 link ph3 pv2 dib bg-light-blue'>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLink;