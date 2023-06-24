import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";

import listenForOutsideClicks from "../../../helpers/listen-for-outside-clicks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import capitalize from "../../../utils/capitalize";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import formatDate from "../../../helpers/format-date";
import { IProduct } from "../../../../types";
import classnames from "../../../utils/classnames";

// import ProductActionsMenu from "./ProductActionsMenu";

export default function Product({ product }: { product: IProduct }) {
  const [productActionsMenuOpen, setProductActionsMenuOpen] =
    useState<boolean>(false);

  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);

  useEffect(
    listenForOutsideClicks(
      listening,
      setListening,
      menuRef,
      setProductActionsMenuOpen
    )
  );

  let imageSrc = "";
  switch (product.type) {
    case "firstsolar":
      imageSrc = "/img/FirstSolar_logo.svg";
      break;
    case "sunpower":
      imageSrc = "/img/Sunpower_logo.svg";
      break;
    case "jinkosolar":
      imageSrc = "/img/JinkoSolar_logo.svg";
      break;
    default:
      imageSrc = "/img/FirstSolar_logo.svg";
      break;
  }

  const close = () => setProductActionsMenuOpen(!productActionsMenuOpen);

  return (
    <div className="relative min-h-[220px] cursor-pointer rounded-md border bg-white px-5 py-7 shadow-md transition hover:shadow-lg">
      <div
        className="absolute right-4 top-5 z-20 flex h-8 w-8 cursor-pointer"
        ref={menuRef}
        onClick={close}
      >
        {/* <ProductActionsMenu isOpen={productActionsMenuOpen} product={product} /> */}
      </div>
      {productActionsMenuOpen && (
        <div className={`absolute inset-0 z-10 bg-white/60`}></div>
      )}

      <Link href={`/products/${product.uuid}`} prefetch={false}>
        <a className="relative flex h-full flex-col justify-between">
          <div className="grow">
            <div
              className={classnames(
                "relative",
                product.type === "firstsolar"
                  ? "h-[100px] w-[105px]"
                  : "h-[50px] w-[135px]"
              )}
            >
              <Image
                src={imageSrc}
                alt="Company logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="mb-3 mt-3 flex flex-col"></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">
              Created on{" "}
              {capitalize(
                formatDate(dayjs(product.createdAt).format("YYYY-MM-DD"), false)
              )}
            </span>
          </div>
        </a>
      </Link>
    </div>
  );
}
