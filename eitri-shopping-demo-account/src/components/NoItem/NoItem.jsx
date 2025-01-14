import imgBox from '../../assets/images/box-01.svg'

export default function NoItem(props) {
	const { title, subtitle } = props

	return (
		<View
			display='flex'
			direction='column'
			justifyContent='center'
			alignItems='center'
			gap='16px'
			padding='large'>
      <Icon
        iconKey='package'
        color='primary-700'
        width={48}
        height={48}
      />
			<Text
				block
				textAlign='center'
				fontWeight='bold'
				fontSize='small'>
				{title}
			</Text>
			<Text
				block
				textAlign='center'
				fontWeight='medium'
				fontSize='small'>
				{subtitle}
			</Text>
		</View>
	)
}
