import { App } from 'eitri-shopping-vtex-shared'

export default function SkuSelector(props) {
	const { product, currentSku, onSkuChange, marginTop } = props
	const [skuVariations, setSkuVariations] = useState([])

	useEffect(() => {
		const selectedVariations = product.items.reduce((acc, item) => {
			item.variations.forEach(variation => {
				const accVar = acc.find(foundVariation => foundVariation?.field?.name === variation.name)

				if (accVar) {
					if (!accVar.values.some(value => value.name === variation.values?.[0])) {
						accVar.values.push({ name: variation.values?.[0], originalName: variation.values?.[0] })
					}
				} else {
					acc.push({
						field: { name: variation.name, originalName: variation.name },
						values: [{ name: variation.values?.[0], originalName: variation.values?.[0] }]
					})
				}
			})

			return acc
		}, [])

		setSkuVariations(selectedVariations)
	}, [])

	const handleSkuChange = (variationToChange, valueToChange) => {
		const variationOfCurrentSku = currentSku.variations.map(variation => ({
			variation: variation.name,
			value: currentSku[variation.name][0]
		}))

		const newDesiredVariation = variationOfCurrentSku.map(variation => {
			if (variation.variation === variationToChange) {
				return { variation: variationToChange, value: valueToChange }
			}
			return variation
		})

		onSkuChange(newDesiredVariation)
	}

	if (!(skuVariations?.length > 0)) {
		return null
	}

	const renderOption = (sku, value) => {
		if (
			App.configs?.appConfigs?.pdp?.preferImageOnSkuSelectFor?.toLocaleLowerCase() ===
			sku?.field?.name?.toLocaleLowerCase()
		) {
			const findSku = product.items.find(item => item[sku?.field?.name][0] === value?.name)
			return (
				<Touchable
					display='flex'
					alignItems='center'
					gap={8}
					onPress={() => handleSkuChange(sku?.field?.name, value?.name)}>
					<View
						borderColor={'primary-500'}
						borderWidth={currentSku?.[sku?.field?.name][0] === value?.name ? 'hairline' : 'none'}>
						<Image
							src={findSku?.images?.[0]?.imageUrl}
							maxWidth={'40px'}
							maxHeight={'40px'}
						/>
					</View>

					<Text fontSize='extra-small'>{value?.name}</Text>
				</Touchable>
			)
		}

		return (
			<Touchable
				display='flex'
				alignItems='center'
				gap={8}
				onPress={() => handleSkuChange(sku?.field?.name, value?.name)}>
				<Radio
					name={sku?.field?.name}
					checked={currentSku?.[sku?.field?.name][0] === value?.name}
					onChange={_ => {}}
				/>
				<Text fontSize='extra-small'>{value?.name}</Text>
			</Touchable>
		)
	}

	return (
		<View
			marginTop={marginTop}
			direction='column'
			gap={12}>
			{skuVariations?.map((sku, index) => (
				<View>
					<Text
						fontWeight='bold'
						fontSize='medium'>{`${sku?.field?.name}`}</Text>
					<View
						display='flex'
						flexWrap='wrap'
						gap={16}
						marginTop='nano'>
						{sku?.values?.map(value => renderOption(sku, value))}
					</View>
				</View>
			))}
		</View>
	)
}
