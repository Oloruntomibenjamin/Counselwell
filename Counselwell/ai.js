const searchToggle = document.getElementById('searchToggle');
const searchBox = document.getElementById('searchBox');
const searchInput = document.getElementById('searchInput');
const searchSubmit = document.getElementById('searchSubmit');
const searchStatus = document.getElementById('searchStatus');
const menuToggle = document.getElementById('menuToggle');
const mobilePanel = document.getElementById('mobilePanel');

function openSearch() {
	searchBox.classList.remove('hidden');
	searchToggle.setAttribute('aria-expanded', 'true');
	searchToggle.setAttribute('aria-label', 'Close search');
	searchInput.focus();
}

function closeSearch() {
	searchBox.classList.add('hidden');
	searchToggle.setAttribute('aria-expanded', 'false');
	searchToggle.setAttribute('aria-label', 'Open search');
	searchToggle.focus();
}

function doSearch() {
	const query = searchInput.value.trim().toLocaleLowerCase();
	if (!query) {
		searchInput.focus();
		return;
	}

	const candidates = document.querySelectorAll(
		'main h1, main h2, main h3, main .card, main .therapist, main .step, main .testimonial, main .faq-item, main #contact'
	);
	const match = Array.from(candidates).find((element) =>
		element.textContent.toLocaleLowerCase().includes(query)
	);

	if (!match) {
		searchStatus.textContent = `No results found for "${searchInput.value.trim()}".`;
		return;
	}

	document.querySelectorAll('.search-match').forEach((element) => {
		element.classList.remove('search-match');
	});
	match.classList.add('search-match');
	match.tabIndex = -1;
	match.focus({ preventScroll: true });
	match.scrollIntoView({ behavior: 'smooth', block: 'center' });
	searchStatus.textContent = `Found a result for "${searchInput.value.trim()}".`;
}

searchToggle.addEventListener('click', () => {
	if (searchBox.classList.contains('hidden')) {
		openSearch();
	} else {
		closeSearch();
	}
});

searchInput.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		closeSearch();
	} else if (event.key === 'Enter') {
		event.preventDefault();
		doSearch();
	}
});
searchSubmit.addEventListener('click', doSearch);

function setMobileMenuOpen(open) {
	menuToggle.setAttribute('aria-expanded', String(open));
	menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
	mobilePanel.classList.toggle('open', open);
	mobilePanel.setAttribute('aria-hidden', String(!open));
}

menuToggle.addEventListener('click', () => {
	setMobileMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});

mobilePanel.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', () => setMobileMenuOpen(false));
});

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		if (!searchBox.classList.contains('hidden')) {
			closeSearch();
		}
		if (mobilePanel.classList.contains('open')) {
			setMobileMenuOpen(false);
			menuToggle.focus();
		}
	}
});

document.querySelectorAll('.faq-question').forEach((question) => {
	question.addEventListener('click', () => {
		const answer = document.getElementById(question.getAttribute('aria-controls'));
		const open = question.getAttribute('aria-expanded') !== 'true';
		question.setAttribute('aria-expanded', String(open));
		answer.classList.toggle('open', open);
		question.querySelector('.faq-indicator').textContent = open ? '−' : '+';
	});
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
	contactForm.addEventListener('submit', (event) => {
		event.preventDefault();
		const name = document.getElementById('name').value.trim();
		alert(`Thanks, ${name}! Your message has been received (demo).`);
		contactForm.reset();
	});
}

const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
	newsletterForm.addEventListener('submit', (event) => {
		event.preventDefault();
		const email = document.getElementById('newsletterEmail').value.trim();
		alert(`Subscribed with: ${email} (demo)`);
		newsletterForm.reset();
	});
}

const backToTop = document.getElementById('backToTop');
if (backToTop) {
	backToTop.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		backToTop.blur();
	});
}

document.querySelectorAll('.marquee').forEach((marquee) => {
	const inner = marquee.querySelector('.marquee__inner');
	if (!inner) return;

	const speed = Number(marquee.dataset.speed);
	if (Number.isFinite(speed) && speed > 0) {
		marquee.style.setProperty('--marquee-duration', `${speed}s`);
	}
	marquee.addEventListener('mouseenter', () => inner.classList.add('paused'));
	marquee.addEventListener('mouseleave', () => inner.classList.remove('paused'));
	marquee.addEventListener('focusin', () => inner.classList.add('paused'));
	marquee.addEventListener('focusout', () => inner.classList.remove('paused'));
});

document.querySelectorAll('.vertical-scroller').forEach((scroller) => {
	const inner = scroller.querySelector('.vertical-scroller__inner');
	if (!inner) return;

	const speed = Number(scroller.dataset.speed);
	if (Number.isFinite(speed) && speed > 0) {
		scroller.style.setProperty('--marquee-v-duration', `${speed}s`);
	}
	scroller.addEventListener('mouseenter', () => inner.classList.add('paused'));
	scroller.addEventListener('mouseleave', () => inner.classList.remove('paused'));
	scroller.addEventListener('focusin', () => inner.classList.add('paused'));
	scroller.addEventListener('focusout', () => inner.classList.remove('paused'));
});
