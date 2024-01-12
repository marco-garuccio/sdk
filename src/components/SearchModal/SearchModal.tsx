import React, { useRef, useEffect, useCallback, useState } from "react";
import { IconSearch, Tabs } from "@geotab/react-component-library";
import { APIReferenceIcon, GuidesIcon, IconClearSearch } from "../SearchModal";
import AllSearchResultContent from "./AllSearchResultContent";
import APISearchResults from "./APISearchResults";
import GuidesSearchResult from "./GuidesSearchResult";
import "./SearchModal.scss";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState("");

    const handleOutsideClick = useCallback(
        (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        },
        [onClose]
    );

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            window.addEventListener("mousedown", handleOutsideClick);
            inputRef.current?.focus();
        } else {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen, handleOutsideClick, handleKeyDown]);

    if (!isOpen) {
        return null;
    }

    return (
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        <div className={`search-modal-backdrop ${isOpen ? "" : "hidden"}`} role="button" aria-labelledby="search-modal">
            <div className="search-modal-container" ref={modalRef}>
                <div className="search-modal-header-container">
                    <div className="search-modal-input-field-container">
                        <div className={`search-modal-input-field ${inputValue && "search-has-value"}`}>
                            <div className="modal-search-icon">
                                <IconSearch />
                            </div>
                            <input ref={inputRef} className="modal-search-input" type="search" placeholder="Search" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                            {inputValue && (
                                <button className="clear-search-button" onClick={() => setInputValue("")}>
                                    <IconClearSearch />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="search-modal-tabs-container">
                    <Tabs
                        defaultTab=""
                        tabs={[
                            {
                                name: "All",
                                content: <AllSearchResultContent inputValue={inputValue} />,
                                icon: IconSearch,
                                disabled: false
                            },
                            {
                                name: "API Reference",
                                content: <APISearchResults inputValue={inputValue} />,
                                icon: APIReferenceIcon,
                                disabled: false
                            },
                            {
                                name: "Guides",
                                content: <GuidesSearchResult inputValue={inputValue} />,
                                icon: GuidesIcon,
                                disabled: false
                            }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}