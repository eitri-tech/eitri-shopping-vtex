import arrowLeft from '../../assets/icons/arrow-left.svg'
import Eitri from 'eitri-bifrost'

export default function BigTitle(props) {
	const { title, withBackAction } = props

	const goBack = () => {
		Eitri.navigation.back()
	}

	return (
		<View display='flex'>
			{withBackAction && (
				<View
					backgroundColor='neutral-100'
					width='40px'
					height='40px'
					minHeight='40px'
					minWidth='40px'
					display='flex'
					alignItems='center'
					borderRadius='circular'
					borderColor='neutral-300'
					borderWidth='hairline'
					justifyContent='center'
					marginRight='display'>
					<Touchable onPress={goBack}>
						<Image
							src={arrowLeft}
							width='16px'
							height='16px'
						/>
					</Touchable>
				</View>
			)}
			<Text
				block
				fontWeight='bold'
				fontFamily='Baloo 2'
				fontSize='huge'>
				{title}
			</Text>
		</View>
	)
}
