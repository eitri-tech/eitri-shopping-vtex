import Eitri from 'eitri-bifrost'
import { Vtex } from 'eitri-shopping-vtex-shared'
import { autocompleteSuggestions } from '../../services/ProductService'
import CInput from '../CInput/CInput'
import searchIcon from '../../assets/icons/search-normal.svg'
import { useTranslation } from 'eitri-i18n'

let timeoutId

export default function SearchInput(props) {
	const { onSubmit, incomingValue } = props

	const [searchTerm, setSearchTerm] = useState(incomingValue || '')
	const [searchSuggestion, setSearchSuggestion] = useState([])

	const { t } = useTranslation()

	const legacySearch = Vtex?.configs?.searchOptions?.legacySearch

	const debounce = (func, delay) => {
		return function (...args) {
			clearTimeout(timeoutId)
			timeoutId = setTimeout(() => func.apply(this, args), delay)
		}
	}

	const fetchSuggestions = async value => {
		try {
			if (!value) {
				setSearchSuggestion([])
				return
			}
			const result = await autocompleteSuggestions(value)
			setSearchSuggestion(result?.searches)
		} catch (error) {
			console.log('Entrada de pesquisa', 'Erro ao buscar sugestão', error)
		}
	}

	const handleAutocomplete = async value => {
		setSearchTerm(value)

		if (legacySearch) {
			return
		}

		const debouncedFetchSuggestions = debounce(fetchSuggestions, 400)
		debouncedFetchSuggestions(value)
	}

	const handleSuggestionSearch = suggestion => {
		setSearchTerm(suggestion)
		handleSearch(suggestion)
	}

	const handleSearch = suggestion => {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}
		setSearchSuggestion([])
		if (typeof onSubmit === 'function') onSubmit(suggestion)
	}

	const onBlurHandler = () => {
		setTimeout(() => {
			setSearchSuggestion([])
		}, 200)
	}

	const navigateBack = () => {
		Eitri.navigation.back()
	}

	return (
		<View
			width='100%'
			display='flex'
			gap='16px'
			position='relative'
			alignItems='center'>
			<Touchable
				onPress={navigateBack}
				borderRadius='circular'
				backgroundColor={'neutral-100'}
				borderColor='neutral-300'
				borderWidth='hairline'
				height='36px'
				width='36px'
				display='flex'
				alignItems='center'
				justifyContent='center'>
				<Icon
					iconKey='chevron-left'
					height={16}
				/>
			</Touchable>

			<View width='100%'>
				<CInput
					icon={searchIcon}
					borderRadius='pill'
					placeholder={t('searchInput.content')}
					value={searchTerm}
					onChange={value => handleAutocomplete(value)}
					onSubmit={value => handleSearch(value)}
					onBlur={onBlurHandler}
					autoFocus={!incomingValue}
				/>
			</View>

			{searchTerm && searchSuggestion && searchSuggestion.length > 0 && (
				<View
					position='absolute'
					// width='calc( 100vw - 32px )'
					width='100vw'
					left={'-16px'}
					customColor='#fdfdfd'
					elevation='low'
					zIndex='9999'
					top={50}
					padding='large'
					direction='column'
					gap={18}
					borderRadius='small'>
					{searchSuggestion.map((suggestion, key) => (
						<Touchable
							key={suggestion.term}
							borderRadius='none'
							borderWidth='none'
							width='100%'
							onPress={() => {
								handleSuggestionSearch(suggestion.term)
							}}>
							<Text
								color='primary-500'
								fontSize='large'
								width='100%'>
								{suggestion.term}
							</Text>
						</Touchable>
					))}
				</View>
			)}
		</View>
	)
}
