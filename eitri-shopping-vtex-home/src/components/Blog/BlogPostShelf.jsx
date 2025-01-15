import Eitri from 'eitri-bifrost'
import BlogCard from './BlogCard'
import { Loading } from 'eitri-shopping-demo-shared'
import SwiperContent from '../SwiperContent'
import { useTranslation } from 'eitri-i18n'

export default function BlogPostShelf(props) {
	const { data } = props
	const [posts, setPosts] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const url = data?.postUrl

	const { t } = useTranslation()

	const getPosts = async () => {
		try {
			const _url = `${url}&per_page=${data?.numberOfItems}`
			const result = await Eitri.http.get(_url)
			setPosts(result.data)
		} catch (error) {
			console.error('Error fetching posts:', error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getPosts()
	}, [])

	const navigateToSeeMore = () => {
		Eitri.navigation.navigate({ path: 'BlogHome' })
	}

	return (
		<SwiperContent
			paddingHorizontal='large'
			title={data.title}
			gap='16px'>
			{isLoading ? (
				<Loading />
			) : (
				<>
					{posts.map((post, index) => {
						let postImg = ''
						const sizes = post._embedded['wp:featuredmedia'][0]?.media_details?.sizes

						if (sizes) {
							if (sizes['medium']) {
								postImg = sizes['medium'].source_url
							} else if (sizes['large']) {
								postImg = sizes['large'].source_url
							} else if (sizes['medium_large']) {
								postImg = sizes['medium_large'].source_url
							} else {
								postImg = post._embedded['wp:featuredmedia'][0].source_url
							}
						} else {
							postImg = post._embedded['wp:featuredmedia'][0].source_url
						}

						const navigateToBlog = () => {
							Eitri.navigation.navigate({ path: 'BlogPost', state: { postId: post.id } })
						}

						return (
							<BlogCard
								key={post.id}
								postImg={postImg}
								post={post}
								handleClick={navigateToBlog}
							/>
						)
					})}

					<Touchable
						padding='medium'
						display='flex'
						direction='column'
						justifyContent='center'
						alignItems='center'
						width='120px'
						height='100%'
						onPress={navigateToSeeMore}>
						<Text
							color='primary-500'
							fontWeight='bold'
							marginBottom='nano'>
							{t('blogPostShelf.seeMore')}
						</Text>
						<Text
							color='primary-500'
							fontWeight='bold'>
							+
						</Text>
					</Touchable>
				</>
			)}
		</SwiperContent>
	)
}
