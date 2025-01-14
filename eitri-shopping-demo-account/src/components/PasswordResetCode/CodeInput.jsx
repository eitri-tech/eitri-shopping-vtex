export default function CodeInput(props) {
	const { length, onFill } = props

	const [values, setValues] = useState([])
	const [currentFocus, setCurrentFocus] = useState(0)

	useEffect(() => {
		document.getElementById(`code-input-0`)?.querySelector('input')?.focus()
	}, [])

	const onKeyDown = (e, index) => {
		if (e.key === 'Backspace') {
			if (index === 0 || e.target.value) {
				return
			}
			document
				.getElementById(`code-input-${index - 1}`)
				?.querySelector('input')
				?.focus()
		}
	}

	const setNewValue = (value, index) => {
		const newValues = [...values]
		newValues[index] = value
		setValues(newValues)

		document.getElementById(`code-input-${index}`)?.querySelector('input')?.blur()

		if (value === '') {
			document
				.getElementById(`code-input-${index - 1}`)
				?.querySelector('input')
				?.focus()
		} else {
			document
				.getElementById(`code-input-${index + 1}`)
				?.querySelector('input')
				?.focus()
		}

		if (newValues.length === length && newValues.every(value => value)) {
			onFill(newValues.join(''))
		}
	}

	const onFocusElement = index => {
		setCurrentFocus(index)
		const element = document.getElementById(`code-input-${index}`)?.querySelector('input')
		element.removeEventListener('keydown', e => onKeyDown(e, index))
		element.addEventListener('keydown', e => onKeyDown(e, index))
	}

	const onBlurElement = index => {
		setCurrentFocus(-1)
		const element = document.getElementById(`code-input-${index}`)?.querySelector('input')
		element.removeEventListener('keydown', e => onKeyDown(e, index))
	}

	return (
		<View
			display='flex'
			gap='16px'>
			{Array.from({ length }, (_, index) => (
				<View
					key={index}
					id={`code-input-${index}`}
					backgroundColor={currentFocus === index ? 'background-color' : 'neutral-100'}
					borderColor='neutral-300'
					minHeight='48px'
					borderRadius='small'
					borderWidth='hairline'
					justifyContent='center'
					display='flex'>
					<Input
						borderHidden={true}
						type={'text'}
						value={values[index]}
						maxLength={1}
						padding='none'
						onBlur={() => {
							onBlurElement(index)
						}}
						onFocus={() => {
							onFocusElement(index)
						}}
						onChange={value => {
							setNewValue(value, index)
						}}
					/>
				</View>
			))}
		</View>
	)
}
