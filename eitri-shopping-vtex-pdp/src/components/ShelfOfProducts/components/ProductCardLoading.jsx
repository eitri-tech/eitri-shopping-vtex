import { Loading } from 'eitri-shopping-vtex-components-shared'

export default function ProductCardLoading(props) {
	const { width, gap } = props

	return (
		<View
			display='flex'
			justifyContent='center'>
			<View
				width='50%'
				padding='large'
				paddingRight='nano'>
				<View
					minHeight='341px'
					borderRadius='small'
					padding='small'
					borderColor='neutral-500'
					borderWidth='hairline'>
					<View
						direction='column'
						justifyContent='center'
						borderRadius='micro'
						alignItems='center'
						padding='small'
						paddingTop='jumbo'>
						<Loading
							inline
							width='80px'
						/>
					</View>
				</View>
			</View>

			<View
				width='50%'
				padding='large'
				paddingLeft='nano'>
				<View
					minHeight='341px'
					borderRadius='small'
					padding='small'
					borderColor='neutral-500'
					borderWidth='hairline'>
					<View
						direction='column'
						justifyContent='center'
						borderRadius='micro'
						alignItems='center'
						padding='small'
						paddingTop='jumbo'>
						<Loading
							inline
							width='80px'
						/>
					</View>
				</View>
			</View>
		</View>
	)
}
