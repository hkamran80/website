import Head from "next/head";
import Layout from "../components/Layout";
import { UNSPLASH_PHOTOS_URL, UNSPLASH_URL } from "../data/constants";
import type { GetStaticProps, NextPage } from "next";
import { siUnsplash } from "simple-icons/icons";
import type { Photo, UnsplashPhoto } from "../types/photography";
import { blurHashToDataURL } from "../util/image";
import Image from "next/image";
import { Masonry } from "masonic";
import TextLink from "../components/TextLink";

type Props = {
    photos: Photo[];
};

const Photography: NextPage<Props> = ({ photos }) => {
    return (
        <Layout>
            <Head>
                <title>Photography | H. Kamran</title>
            </Head>

            <h1 className="text-3xl font-semibold flex items-center">
                <span className="flex-1">Photography</span>
                <a
                    href={UNSPLASH_URL}
                    target="_blank"
                    rel="nofollow noreferrer"
                    title="Atom feed"
                >
                    <svg
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-gray-400 hover:fill-pink-400 transition-colors duration-300 w-5 h-5"
                    >
                        <title>{siUnsplash.title}</title>
                        <path d={siUnsplash.path} />
                    </svg>
                </a>
            </h1>

            <div className="mt-6">
                <Masonry
                    items={photos}
                    columnGutter={10}
                    rowGutter={10}
                    render={({ index, data: photo }) => {
                        return (
                            <TextLink
                                key={index}
                                href={photo.linkUrl}
                                className="hover:scale-125 transform-transfrom duration-300"
                            >
                                <Image
                                    src={photo.imageUrl}
                                    width={photo.width}
                                    height={photo.height}
                                    alt={photo.alt}
                                    className="rounded-lg hover:scale-125 transform-transfrom duration-300"
                                    // blurDataURL={photo.blurDataUrl ?? undefined}
                                />
                            </TextLink>
                        );
                    }}
                />
                {/* {photos.map((photo, index) => (
                    <Image
                        key={index}
                        src={photo.imageUrl}
                        width={photo.width}
                        height={photo.height}
                        alt={photo.alt}
                        // blurDataURL={photo.blurDataUrl ?? undefined}
                    />
                ))} */}
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    let currentPage = 1;
    let pages = null;
    let unsplashPhotos: Photo[] = [];

    const firstPage = await (
        await fetch(UNSPLASH_PHOTOS_URL + `?page=1`, {
            headers: {
                Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
            },
        })
    ).json();

    pages = Math.ceil(firstPage[0].user.total_photos / 10);
    currentPage += 1;

    unsplashPhotos.push(
        ...firstPage.map((photo: UnsplashPhoto) => {
            return {
                imageUrl: photo.urls.raw,
                // blurDataUrl: photo.blur_hash
                //     ? blurHashToDataURL(photo.blur_hash) ?? null
                //     : null,
                blurDataUrl: null,
                alt: photo.description ?? photo.alt_description ?? "",
                width: photo.width,
                height: photo.height,
                linkUrl: photo.links.html,
            };
        }),
    );

    while (currentPage <= pages) {
        unsplashPhotos.push(
            ...(
                await (
                    await fetch(UNSPLASH_PHOTOS_URL + `?page=${currentPage}`, {
                        headers: {
                            Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
                        },
                    })
                ).json()
            ).map((photo: UnsplashPhoto) => {
                return {
                    imageUrl: photo.urls.regular,
                    blurDataUrl: photo.blur_hash
                        ? blurHashToDataURL(photo.blur_hash) ?? null
                        : null,
                    alt: photo.description ?? photo.alt_description ?? "",
                    width: photo.width,
                    height: photo.height,
                    linkUrl: photo.links.html,
                };
            }),
        );

        currentPage += 1;
    }

    return { props: { photos: unsplashPhotos } };
};

export default Photography;
