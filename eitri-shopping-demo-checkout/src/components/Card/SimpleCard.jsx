import { useTranslation } from 'eitri-i18n'

export default function SimpleCard(props) {
	const { isFilled, title, subtitle, index, onPress, children, icon, ...rest } = props

	const { t } = useTranslation()

	return (
		<Touchable
			onPress={onPress}
			width='100%'
			padding='small'
			borderWidth='hairline'
			borderColor='neutral-700'
			direction='column'
			borderRadius='small'>
			<View
				direction='row'
				display='flex'
				justifyContent='between'>
				<View
					display='flex'
					alignItems='center'
					justifyContent='center'
					gap={12}>
					<Image
						src={icon}
						width='24px'
						height='24px'
					/>
					<Text
						fontSize='small'
						fontWeight='bold'>
						{title}
					</Text>
				</View>
				<View
					direction='column'
					alignItems='center'
					justifyContent='center'>
					<Icon
						iconKey={isFilled ? 'check' : 'edit'}
						color='primary-700'
						height={20}
					/>
				</View>
			</View>

			{isFilled && (
				<>
					<View marginTop='display'>
						<View>{children}</View>
						<View marginTop='small'>
							<Text
								textTransform='uppercase'
								fontSize='extra-small'
								color='primary-700'>
								{t('simpleCard.txtEdit')}
							</Text>
						</View>
					</View>
				</>
			)}
		</Touchable>
	)
}
