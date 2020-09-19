import moment from "moment";

export default class Article {
    context: string;
    title: string;
    subtext: string;
    image: any;
    onPress!: () => any;
    constructor(item:any, navigate:any){
        this.context = item.source.name;
        this.title = item.title;
        this.subtext = moment(item.publishedAt).fromNow();

        if (item.urlToImage) this.image = item.urlToImage;

        if (navigate) this.onPress = () => navigate("Article", {title: item.title, article: item});
    }
}