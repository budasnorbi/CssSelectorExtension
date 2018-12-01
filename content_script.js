var clickedElement;

document.addEventListener('mousedown', event => { 
	clickedElement = event.target
}, true);

chrome.runtime.onMessage.addListener( (req, sender, sendRes) => {
	if(req === 'getSelector'){
		const data = {
			url: window.location.href,
			selector: clickedElement.localName + [].slice.call(clickedElement.attributes).map(attribue => `[${attribue.name}="${attribue.value}"]`).join('')
		};

		const copyToClipboard = str => {
			const el = document.createElement('textarea');
			el.value = str;
			document.body.appendChild(el);
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);
		};

		const onCopy = e => {
			const div = document.createElement('div');
			div.textContent = 'Url and selector copied!';
			div.style.border = 'solid 5px red';
			div.style.fontFamily = 'sans-serif';
			div.style.padding = '15px';
			div.style.position = 'absolute';
			div.style.left = '50%';
			div.style.top = '50px';
			div.style.fontSize = '18px';
			div.style.backgroundColor = '#2c3e50';
			div.style.color = 'white';
			div.style.border = 'none';
			div.style.borderRadius = '5px';
			div.style.zIndex = 99;
			div.style.opacity = 0;
			div.style.transition = 'opacity .25s ease-in-out';
			document.body.append(div);

			setTimeout(()=>{
				div.style.opacity = '0.85';
				setTimeout(()=>{
					div.style.opacity = 0;
					setTimeout(()=>{
						document.body.removeChild(div);
					},2500);
				},1000);
			},250);


			document.removeEventListener('copy', onCopy);
		}

		document.addEventListener('copy', onCopy);

		copyToClipboard(JSON.stringify(data))


	}
});
