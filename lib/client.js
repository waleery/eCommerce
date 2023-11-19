import { createClient} from "@sanity/client";
import  ImageUrlBuilder  from "@sanity/image-url";


export const client = createClient({
    projectId:'8yeifiqk',
    dataset:'production',
    apiVersion:'2023-11-17',
    useCdn:true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    ignoreBrowserTokenWarning: true
})

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source)