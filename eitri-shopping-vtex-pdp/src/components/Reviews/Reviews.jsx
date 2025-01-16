import { Divisor, Loading, Spacing } from 'eitri-shopping-vtex-components-shared'
import Review from './Review'
import { useTranslation } from 'eitri-i18n'

export default function Reviews(props) {
	const { reviews, disableReviewButton, ratingsCount, fetchAndSetReviews, productId, productLinkText } = props

	const [collapsed, setCollapsed] = useState(false)
	const [buttomIsLoading, setButtomIsLoading] = useState(false)
	const [page, setPage] = useState(1)

	const { t } = useTranslation()

	const toggleCollapsedState = () => {
		setCollapsed(!collapsed)
	}

	const setReviews = async () => {
		setButtomIsLoading(true)
		await fetchAndSetReviews(page + 1, productId, productLinkText)
		setPage(page + 1)
		setButtomIsLoading(false)
	}

  if (!reviews) return null

	return (
		<View>
			<Touchable onPress={() => toggleCollapsedState()}>
				<View
					display='flex'
					alignItems='center'
					justifyContent='between'
					width='100%'>
					<Text
						fontSize='large'
						fontWeight='bold'>{`Avaliações (${ratingsCount})`}</Text>
					<Icon
						iconKey={collapsed ? 'chevron-down' : 'chevron-up'}
						width={26}
					/>
				</View>
			</Touchable>
			{!collapsed && (
				<View>
					{reviews?.items.map((review, index) => (
						<Review
							key={index}
							review={review}
						/>
					))}
					{!disableReviewButton && (
						<View paddingVertical='small'>
							<Touchable onPress={() => setReviews()}>
								<View
									display='flex'
									height='40px'
									width='50vw'
									backgroundColor='accent-100'
									borderWidth='hairline'
									borderColor='primary-700'
									justifyContent='center'
									alignItems='center'
									borderRadius='circular'>
									{buttomIsLoading ? (
										<Loading />
									) : (
										<Text
											fontWeight='bold'
											color='primary-700'>
											{t('review.seeMoreReviews')}
										</Text>
									)}
								</View>
							</Touchable>
                            <Spacing height={'10px'} />
							<Divisor />
						</View>
					)}
				</View>
			)}
		</View>
	)
}
