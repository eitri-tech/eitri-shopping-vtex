import { App } from 'eitri-shopping-vtex-shared'

export default function SkuSelector(props) {
	const { product, currentSku, onSkuChange, marginTop } = props

	const [selectedVariations, setSelectedVariations] = useState({})
	const [variations, setVariations] = useState([])
	const [skus, setSkus] = useState([])

	const MAIN_VARIATION = 'Cor'

	useEffect(() => {
		const skus = resolveSkus(product)
		const variations = skus.reduce((acc, item) => {
			Object.keys(item.variations)?.forEach(variation => {
				const accVar = acc.find(foundVariation => foundVariation?.name === variation)

				const variationValue = item.variations[variation]

				if (accVar) {
					if (!accVar.values.some(value => value === variationValue)) {
						accVar.values.push(variationValue)
					}
				} else {
					acc.push({
						name: variation,
						values: [variationValue]
					})
				}
			})

			return acc
		}, [])
		const selectedVariation = skus.find(_sku => _sku.itemId === currentSku.itemId)

		setSkus(skus)
		setVariations(variations)
		setSelectedVariations(selectedVariation?.variations)
	}, [])

	useEffect(() => {
		if (!currentSku || variations?.length === 0 || skus?.length === 0) return
		const selectedVariation = skus.find(_sku => _sku.itemId === currentSku.itemId)
		if (selectedVariation) {
			setSelectedVariations(selectedVariation?.variations)
		}
	}, [currentSku])

	const availableVariationValues = useMemo(() => {
		const available = {}
		variations.forEach(variation => {
			available[variation.name] = variation.values.filter(value =>
				skus.some(
					sku =>
						sku.variations[variation.name] === value &&
						sku.available &&
						Object.entries(selectedVariations).every(
							([varName, varValue]) =>
								varName === variation.name || sku.variations[varName] === selectedVariations[varName]
						)
				)
			)
		})
		return available
	}, [variations, skus, selectedVariations])

	const resolveSkus = product => {
		return product?.items?.map(item => {
			const variations = {}

			item.variations?.forEach(_variation => {
				const variation = typeof _variation === 'string' ? _variation : _variation.name
				variations[variation] = item?.[variation]?.[0]
			})

			const sellerDefault = item?.sellers?.find(seller => seller?.sellerDefault) ?? item?.sellers?.[0]
			const isAvailable =
				sellerDefault?.commertialOffer?.IsAvailable ?? sellerDefault?.commertialOffer?.AvailableQuantity > 0

			return {
				itemId: item.itemId,
				image: item?.images?.[0].imageUrl,
				variations: variations,
				available: isAvailable
			}
		})
	}

	const findAvailableSKU = selections => {
		return (
			skus.find(sku =>
				Object.entries(selections).every(([varName, varValue]) => sku.variations[varName] === varValue)
			) || null
		)
	}

	const findSKUImage = (skuName, varValue) => {
		const _sku = skus.find(sku => sku.variations[skuName] === varValue)
		return _sku?.image ?? ''
	}

	const handleVariationSelect = (variationName, value) => {
		const newSelections = {
			...selectedVariations,
			[variationName]: value
		}

		const newDesiredVariation = findAvailableSKU(newSelections)

		onSkuChange(newDesiredVariation?.itemId)
	}

	const renderOption = (sku, value) => {
		const isAvailable = availableVariationValues[sku].includes(value)
		const isSelected = selectedVariations[sku] === value

		return (
			<View
				display='flex'
				alignItems='center'
				gap={8}>
				<Touchable onPress={() => handleVariationSelect(sku, value)}>
					{App.configs?.appConfigs?.pdp?.preferImageOnSkuSelectFor?.toLocaleLowerCase() ===
					sku?.toLocaleLowerCase() ? (
						<View
							borderColor={'primary-500'}
							borderWidth={isSelected ? 'hairline' : 'none'}>
							<Image
								src={findSKUImage(sku, value)}
								maxWidth={'40px'}
								maxHeight={'40px'}
							/>
						</View>
					) : (
						<Radio
							name={sku}
							checked={isSelected}
							disabled={!isAvailable}
							onChange={_ => {}}
						/>
					)}
				</Touchable>
				<Text
					fontSize='extra-small'
					textDecoration={MAIN_VARIATION === sku || isAvailable ? 'none' : 'line-through'}
					color={MAIN_VARIATION === sku || isAvailable ? '' : 'neutral-300'}>
					{value}
				</Text>
			</View>
		)
	}

	return (
		<View
			marginTop={marginTop}
			direction='column'
			gap={12}>
			{variations?.map((sku, index) => (
				<View>
					<Text
						fontWeight='bold'
						fontSize='medium'>{`${sku?.name}`}</Text>
					<View
						display='flex'
						flexWrap='wrap'
						gap={16}
						marginTop='nano'>
						{sku?.values?.map(value => renderOption(sku?.name, value))}
					</View>
				</View>
			))}
		</View>
	)
}

