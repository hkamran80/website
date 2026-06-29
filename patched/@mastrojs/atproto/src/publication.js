import fs from "node:fs/promises";
const themeKeys = [
  "background",
  "foreground",
  "accent",
  "accentForeground"
];
export const pubUriFromFile = async (wellKnownFilePath)=>{
  try {
    const uri = (await fs.readFile(wellKnownFilePath, {
      encoding: "utf8"
    })).trim();
    if (!uri.startsWith("at://")) {
      throw Error(`publicationUri must be an at:// protocol URI, was ${uri}`);
    }
    const [_, rkey] = uri.split("/site.standard.publication/");
    if (!rkey) {
      throw Error(`Could not extract site.standard.publication rkey from ${uri}`);
    }
    return {
      uri,
      rkey
    };
  } catch (e) {
    if (e.code !== "ENOENT") {
      throw e;
    }
  }
};
export const createOrUpdatePublication = async (agent, pub)=>{
  const oldPub = await fetchPublication(agent, pub.rkey);
  if (!oldPub) {
    await pushPublication(agent, "createRecord", pub);
  } else {
    const changedPub = comparePubs(oldPub, pub);
    if (changedPub) {
      await pushPublication(agent, "putRecord", changedPub);
      const pubPathChanged = new URL(oldPub.url).pathname !== pub.url.pathname;
      return pubPathChanged;
    }
  }
  return false;
};
export const comparePubs = (oldPub, pub)=>{
  const { icon: oldIcon, basicTheme: oldTheme } = oldPub;
  const iconChanged = oldIcon?.size !== (pub.icon ? Buffer.byteLength(pub.icon.blob) : undefined);
  const newTheme = pub.basicTheme;
  const themeChanged = themeKeys.some((key)=>oldTheme?.[key].r !== newTheme?.[key].r || oldTheme?.[key].g !== newTheme?.[key].g || oldTheme?.[key].b !== newTheme?.[key].b);
  const stringFieldChanged = new URL(oldPub.url).toString() !== pub.url.toString() || oldPub.name !== pub.name || oldPub.description !== pub.description;
  return iconChanged || themeChanged || stringFieldChanged ? iconChanged ? pub : {
    ...pub,
    icon: oldIcon
  } // don't re-upload icon if not changed
   : undefined;
};
const fetchPublication = async (agent, rkey)=>{
  try {
    const pub = await agent.com.atproto.repo.getRecord({
      repo: agent.did,
      collection: "site.standard.publication",
      rkey
    });
    return pub.data.value;
  } catch (e) {
    if (e.error === "RecordNotFound") {
      return;
    } else {
      throw e;
    }
  }
};
export async function pushPublication(agent, action, pub) {
  let icon;
  if (pub.icon && "blob" in pub.icon) {
    const res = await agent.com.atproto.repo.uploadBlob(new Uint8Array(pub.icon.blob), {
      encoding: pub.icon.mimeType
    });
    console.log("Uploaded new icon");
    const { mimeType, ref, size } = res.data.blob;
    icon = {
      $type: "blob",
      ref: {
        $link: ref.toString()
      },
      mimeType,
      size
    };
  } else {
    icon = pub.icon;
  }
  const theme = pub.basicTheme;
  const basicTheme = theme ? {
    "$type": "site.standard.theme.basic",
    ...Object.fromEntries(themeKeys.map((key)=>[
        key,
        {
          ...theme[key],
          $type: "site.standard.theme.color#rgb"
        }
      ]))
  } : undefined;
  const res = await agent.com.atproto.repo[action]({
    repo: agent.did,
    collection: "site.standard.publication",
    rkey: pub.rkey,
    record: {
      $type: "site.standard.publication",
      url: pub.url.toString().slice(0, -1),
      name: pub.name,
      description: pub.description,
      icon,
      basicTheme,
      preferences: {
        showInDiscover: true
      }
    }
  });
  console.log(`${action === "createRecord" ? "Created" : "Updated"} publication ${res.data.uri}`);
  return res;
}
//# sourceMappingURL=publication.js.map
