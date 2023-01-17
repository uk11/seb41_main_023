import {Fragment} from "react";
import SinglePlan from "./SinglePlan";


const SinglePlanBox = (props) => {
    const {
        setAddExpenseModal,
        singleData,
        setCurrentDate,
        setCurrentPlace,
        setCurrentPlaceId,
        planDate,
        handleGeoCode,
        handleZoom,
        expenses,
        refresh,
        handleRefresh
    } = props;

    return (
        <Fragment>
            {singleData &&
                singleData.places.map((data, idx) => (
                    <SinglePlan
                        key={data.placeId}
                        idx={idx}
                        data={data}
                        setAddExpenseModal={setAddExpenseModal}
                        setCurrentDate={setCurrentDate}
                        planDate={planDate}
                        setCurrentPlace={setCurrentPlace}
                        setCurrentPlaceId={setCurrentPlaceId}
                        handleGeoCode={handleGeoCode}
                        handleZoom={handleZoom}
                        expenses={expenses}
                        refresh={refresh}
                        handleRefresh={handleRefresh}
                    />
                ))
            }
        </Fragment>
    )
};

export default SinglePlanBox;