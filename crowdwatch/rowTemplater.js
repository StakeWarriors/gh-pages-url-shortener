const crown1 = "https://filfox.info/dist/img/first.f20f1e6.png";
const crown2 = "https://filfox.info/dist/img/second.ab3c1e7.png";
const crown3 = "https://filfox.info/dist/img/third.93fe8ab.png";


function addressShorten(address) {
    return address.substring(0, 6) + "..." + address.substring(address.length - 6);
}

function createLarge(index, address, ens, ratio, numReporters, scamLevel, safeLevel) {
    let rank;
    if (index <= 3) {
        let crown = crown1;
        if (index == 2) {
            crown = crown2;
        } else if (index == 3) {
            crown = crown3;
        }
        rank = `<td>
                    <img
                        data-v-33fb9720=""
                        src=${crown}
                        alt="${index}"
                        class="image"
                    />
                </td>`;
    } else {
        rank = `<td>
                  <span
                    data-v-33fb9720=""
                    class="
                      data-cell-1
                      inline-block
                      rounded-full
                      px-1
                      text-socialBg
                      lg:bg-white lg:text-black lg:m-auto
                      bg-background
                    "
                  >
                  </span>
                </td>`;
    }

    return `
            ${rank}
            <td>
                <a class="filecoin-link text-filecoin" title="${address}">
                    ${addressShorten(address)}
                </a>
            </td>
            <td>
                <div
                    data-v-57a10158=""
                    class="flex justify-center items-center max-w-full"
                >
                    ${ens}
                </div>
            </td>
            <td>
                <div class="flex items-center justify-start">
                    <div
                        role="progressbar"
                        aria-valuenow="${ratio}"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        class="el-progress
                               flex
                               w-1/2
                               pr-3
                               ml-8
                               el-progress--line el-progress--without-text">
                        <div class="el-progress-bar">
                            <div class="el-progress-bar__outer" style="height: 6px">
                                <div
                                    class="el-progress-bar__inner"
                                    style="width: ${ratio}%">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>${ratio}</div>
                </div>
            </td>
            <td>${numReporters}</td>
            <td>${scamLevel}</td>
            <td>${safeLevel}</td>
        `;
}


function createSmall(index, address, score) {
    let rank;
    if (index <= 3) {
        let crown = crown1;
        if (index == 2) {
            crown = crown2;
        } else if (index == 3) {
            crown = crown3;
        }
        rank = `<img
                    data-v-33fb9720=""
                    src="${crown}"
                    alt="${index}"
                    class="image"/>`;
    } else {
        rank = `
            <span
                data-v-33fb9720=""
                class="
                  inline-block
                  rounded-full
                  px-1
                  text-socialBg
                  lg:bg-white lg:text-black lg:m-auto
                  bg-background">${index}</span>`;
    }

    return `
    <div class="flex items-center text-xs px-4 border-b">
        <div class="w-1/8 pl-1">
              ${rank}
            </div>
            <div class="w-1/2 flex items-center py-2">
              <div
                data-v-57a10158=""
                class="flex justify-center items-center"
                style="max-width: 66%"
                title="${address}"
              >${addressShorten(address)}</div>
            </div>
            <div class="w-3/8 text-right">${score}</div></div>`;
}