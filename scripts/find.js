function searchText() {
	const text = document.getElementById('searchInput').value.trim()
	document.querySelectorAll('.highlight').forEach(function (el) {
		// Восстанавливаем исходный текст, удаляя подсветку
		const parent = el.parentNode
		if (parent) {
			parent.replaceChild(
				document.createTextNode(el.textContent || el.innerText),
				el
			)
		}
	})

	if (!text) {
		return // Если текст пуст, выходим из функции
	}

	highlight(document.body, text)

	const firstMatch = document.querySelector('.highlight')
	if (firstMatch) {
		firstMatch.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		})
	}
}

function highlight(node, text) {
	if (node.nodeType === 3) {
		// Текстовый узел
		const matches = node.nodeValue.match(new RegExp(text, 'gi'))
		if (matches) {
			const span = document.createElement('span')
			span.classList.add('highlight')
			span.textContent = node.nodeValue
			node.replaceWith(span)
			return true // Нашли совпадение, останавливаем дальнейший поиск в этой ветви
		}
	} else if (
		node.nodeType === 1 &&
		node.childNodes &&
		!/(script|style)/i.test(node.tagName)
	) {
		// Элемент, не скрипт и не стиль
		for (let i = 0; i < node.childNodes.length; i++) {
			if (highlight(node.childNodes[i], text)) {
				break // Как только находим первое совпадение, останавливаем дальнейший поиск
			}
		}
	}
}

document
	.getElementById('searchInput')
	.addEventListener('keydown', function (event) {
		if (event.key === 'Enter') {
			searchText()
		}
	})
