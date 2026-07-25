import { readFile, writeFile } from "fs/promises";
import { parseStringPromise, Builder } from "xml2js";

const atmosphereHosts = ["leaflet.pub", "pckt.pub"];

(async () => {
    const file = await readFile("public/blogroll.new.opml");
    const xmlText = file.toString();

    const xml = await parseStringPromise(xmlText);

    // Rename title
    xml.opml.head[0].title[0] = "H. Kamran's Blogroll";

    // Remove categories
    xml.opml.body[0].outline = xml.opml.body[0].outline.filter((outline) =>
        outline["$"].text.includes("Blogs"),
    );

    for (const category of xml.opml.body[0].outline) {
        // Rename categories
        if (category["$"].text.includes(":"))
            // 7 is the length of "Blogs: "
            category["$"].text = category["$"].text.slice(7);

        for (const _item of category.outline) {
            const item = _item["$"];

            // ATmosphere tag (domain)
            if (atmosphereHosts.some((host) => item.xmlUrl.includes(host)))
                item["data:atmosphere"] = true;

            if ("description" in item) {
                // ATmosphere tag
                if (item.description.includes("[data:atmosphere]"))
                    item["data:atmosphere"] = true;

                // Strip attribute
                delete item["description"];
            }

            // Strip attributes
            if ("frss:filtersActionRead" in item)
                delete item["frss:filtersActionRead"];

            // Strip trailing slashes
            if ("htmlUrl" in item && item["htmlUrl"].endsWith("/"))
                item["htmlUrl"] = item["htmlUrl"].slice(0, -1);
        }

        // `xmlns:data`
        xml.opml["$"] = {
            ...xml.opml["$"],
            "xmlns:data": "https://hkamran.com/schema/data-v1",
        };

        // Build
        const builder = new Builder();
        await writeFile("public/blogroll.opml", builder.buildObject(xml));

        console.log("Blogroll written!");
        console.log(
            "Make sure to remove the entries for this site and the High Speed Rail Alliance before deploying.",
        );
    }
})();
