import Eitri from 'eitri-bifrost'

export default function HeaderFilter(props) {
	const { handleFilterModal, facetsModalReady, searchResults, hasFilters, iconColor } = props

	return (
		<Touchable
			onPress={handleFilterModal}
			position='relative'
			opacity={facetsModalReady || searchResults.length > 0 ? 'solid' : 'light'}>
			<View>
				<Icon
					color={iconColor}
					iconKey='filter'
					width={24}
					height={24}
				/>
			</View>

			{hasFilters && (
				<View
					position='absolute'
					backgroundColor='primary-700'
					width='12px'
					height='12px'
					right={-4}
					top={-2}
					borderRadius='circular'
				/>
			)}
		</Touchable>
	)
}
