export default function ModalStreaming(props) {
	const { showModal, handleModal, content } = props

	const [isLoading, setIsLoading] = useState(true)
	const [updatedIframeString, setUpdatedIframeString] = useState(null)

	useEffect(() => {
		if (content[0].includes('youtube')) {
			const iframeWithoutWidth = content[0].replace(/width="\d+"/, '')
			setUpdatedIframeString(iframeWithoutWidth)
		} else if (content[0].startsWith('http')) {
			const iframeString = `<iframe style="border-radius:12px" src="${content[0]}" width="100%" height="352" frameBorder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
			setUpdatedIframeString(iframeString)
		} else {
			setUpdatedIframeString(content[0])
			setIsLoading(false)
		}
	}, [content])

	return (
		<Modal
			show={showModal}
			position={'center'}
			onClose={() => handleModal(content)}>
			<View
				display='flex'
				direction='column'
				padding='small'
				backgroundColor='accent-100'
				alignItems='end'
				maxwidth={100}
				borderRadius='circular'
				borderColor='neutral-300'>
				<Touchable onPress={() => handleModal(content)}>
					<View padding='30px'>
						<Icon
							width={24}
							height={24}
							iconKey={'x'}
						/>
					</View>
				</Touchable>
				<View width='100%'>
					<HtmlRenderer
						allowUnsafeIframe={true}
						htmlString={updatedIframeString}
					/>
				</View>
			</View>
		</Modal>
	)
}
