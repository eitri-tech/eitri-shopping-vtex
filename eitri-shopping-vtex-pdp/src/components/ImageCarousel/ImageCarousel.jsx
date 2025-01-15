export default function ImageCarousel(props) {

    const [currentSlide, setCurrentSlide] = useState(0)
    const { currentSku } = props;


    const beforeChange = (currentSlide, nextSlide) => {
        setCurrentSlide(nextSlide)
    }

    return (
        <View>
            <Carousel beforeChange={beforeChange}>
                {
                  currentSku?.images?.slice(0, 8).map((item, index) => {
                        return (
                            <View key={index} paddingVertical="extra-small">
                                <View display="flex" justifyContent="center" alignItems="center" height={window.screen.width * 0.8} borderRadius="medium">
                                    <Image src={item.imageUrl} height={window.screen.width * 0.8 * 0.8} maxWidth="80%" />
                                </View>
                            </View>
                        )
                    })
                }
            </Carousel>

            {
              currentSku?.images?.length > 1 && (
                    <View display="flex" gap="5px" justifyContent="center" >
                        {
                          currentSku?.images?.slice(0, 8).map((item, index) => {
                                return (
                                    <View key={index} width="35px" height="8px" backgroundColor={currentSlide === index ? "primary-700" : "neutral-300"} borderRadius="circular" />
                                )
                            })
                        }
                    </View>
                )
            }


        </View>
    )
}
