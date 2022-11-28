const ClearIcon = ({
    showClear,
    setSearchString,
    searchString,
    onclear,
    setFocus
}: {
    showClear: boolean;
    setSearchString: Function;
    searchString: string,
    onclear: Function,
    setFocus: Function
}) => {

    const handleClearSearchString = () => {
        setSearchString("")
        setFocus()
        onclear()
    }

    if (!showClear) {
        return null
    }

    if (!searchString || searchString?.length <= 0) {
        return null
    }


    return (
        <>
            <div className="display-flex flex-algn-center flex-justify-center flex-shrink" onClick={handleClearSearchString}>
                <svg
                className="clear-icon"
                width={20}
                height={20}
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.58 12 5 17.58 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
            </div>
        </>
    )
}


export default ClearIcon