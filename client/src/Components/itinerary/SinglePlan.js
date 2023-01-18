import { useState } from 'react';
import axios from 'axios';
import { getCookie } from '../../Util/Cookies';
import styled from 'styled-components';

const SectionWrapper = styled.div`
  position: relative;
  display: flex;

  &:hover .delete__container {
    opacity: 1;
  }
`;

const PlaceInfoBox = styled.div`
  display: flex;
  gap: var(--spacing-3);
  width: 100%;
  min-height: 150px;
  padding: var(--spacing-3);
  border: 1px solid var(--light-gray-4);
  border-radius: 5px;
  cursor: default;

  > .location-number__container {
    .location-number {
      font-size: var(--small-heading-font-size);
      line-height: var(--small-heading-line-height);
      color: var(--primary-blue-bright);
      font-weight: 600;
    }
  }

  > .place-info__main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const PlaceInfoContainer = styled.div`
  > .location-name {
    margin-bottom: var(--spacing-1);
    font-size: var(--small-heading-font-size);
    line-height: var(--small-heading-line-height);
    color: var(--dark-gray-1);
    font-weight: 600;
  }

  > .location-address {
    color: var(--light);
  }
`;

const PlaceAddingButtons = styled.div`
  > button {
    padding: 0;
    display: flex;
    justify-content: center;
    gap: var(--spacing-2);
    text-align: center;
    background-color: transparent;
    color: var(--dark-gray-3);

    &:hover {
      color: var(--dark-gray-1);
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const PlanDeleteContainer = styled.div`
  position: absolute;
  height: 100%;
  opacity: 0;
  right: 0;

  > button {
    height: 20px;
    margin-right: -40px;
    background-color: transparent;

    .svg-icon--20 {
      position: relative;
      height: 20px;
      margin-left: var(--spacing-2);

      > path {
        fill: var(--light-gray-4);
      }

      &:hover {
        > path {
          fill: var(--red-light-1);
        }
      }
    }
  }
`;

// const clockSvg = (
//     <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet"
//          viewBox="0 0 24 24">
//         <path fill="currentColor"
//               d="M14.55 16.55L11 13V8h2v4.175l2.95 2.95ZM11 6V4h2v2Zm7 7v-2h2v2Zm-7 7v-2h2v2Zm-7-7v-2h2v2Zm8 9q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4Q8.65 4 6.325 6.325Q4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"/>
//     </svg>
// );

const moneySvg = (
  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M3.13518 12.5537C3.30418 13.1921 3.88179 13.6367 4.54217 13.6367C5.19597 13.6367 5.76954 13.2008 5.94452 12.5708L7.14481 8.24977H8.50262L9.71893 12.5804C9.89438 13.205 10.464 13.6367 11.1129 13.6367C11.7694 13.6367 12.3438 13.1949 12.5123 12.5603L13.6564 8.24977H15.25C15.6642 8.24977 16 7.91399 16 7.49977C16 7.08556 15.6642 6.74977 15.25 6.74977H0.75C0.335786 6.74977 0 7.08556 0 7.49977C0 7.91399 0.335786 8.24977 0.75 8.24977H1.99581L3.13518 12.5537ZM11.508 8.24977H10.3505L10.8987 10.3588C10.9077 10.3936 10.9392 10.418 10.9752 10.418C11.0125 10.418 11.0447 10.392 11.0526 10.3556L11.508 8.24977ZM5.32653 8.24977H4.17526L4.63487 10.3558C4.64279 10.3921 4.67492 10.418 4.71206 10.418C4.74817 10.418 4.77968 10.3935 4.78861 10.3585L5.32653 8.24977ZM14.3499 5.63672H12.0732L12.5839 3.27563C12.6991 2.74324 13.17 2.36328 13.7147 2.36328C14.4743 2.36328 15.0278 3.08285 14.8329 3.81701L14.3499 5.63672ZM5.9931 5.63672H9.67122L9.07032 3.32507C8.92309 2.75867 8.41178 2.36328 7.82656 2.36328C7.23916 2.36328 6.72653 2.76156 6.58134 3.33073L5.9931 5.63672ZM3.605 5.63672H1.30406L0.825053 3.82726C0.629279 3.08773 1.1869 2.36328 1.95191 2.36328C2.49992 2.36328 2.97393 2.745 3.09077 3.28041L3.605 5.63672Z'
      fill='#333333'
    />
  </svg>
);

const deleteSvg = (
  <svg viewBox='0 0 16 16' class='svg-icon--20 icon__delete'>
    <path
      fill-rule='evenodd'
      fill='currentColor'
      d='M4,7.50639765 C4,6.6744372 4.66831553,6 5.50473881,6 L10.4952612,6 C11.3263055,6 12,6.67646277 12,7.50639765 L12,13.0026083 C12,14.1057373 11.1132936,15 10.0018986,15 L5.99810135,15 C4.89458045,15 4,14.1041422 4,13.0026083 L4,7.50639765 Z M11,3 L5,3 L5,1.5 C5,1.225 5.225,1 5.5,1 L10.5,1 C10.775,1 11,1.225 11,1.5 L11,3 Z M3,4 C3,3.44771525 3.4556644,3 3.99539757,3 L12.0046024,3 C12.5543453,3 13,3.44386482 13,4 C13,4.55228475 12.5443356,5 12.0046024,5 L3.99539757,5 C3.44565467,5 3,4.55613518 3,4 Z M6,3 L10,3 L10,2 L6,2 L6,3 Z'
    ></path>
  </svg>
);

const SinglePlan = (props) => {
  const {
    idx,
    handleZoom,
    handleGeoCode,
    planDate,
    setCurrentDate,
    data,
    setCurrentPlace,
    setAddExpenseModal,
    setCurrentPlaceId,
    handleRefresh,
  } = props;
  const [delButtonIsShow, setDelButtonIsShow] = useState(false);

  const handleExpenseModal = () => {
    setAddExpenseModal(true);
  };

  const onMouseHandler = () => {
    setDelButtonIsShow((prevState) => !prevState);
  };

  const handleDeletePlan = (selectedPlaceId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/places/${selectedPlaceId}`, {
          headers: {
            Authorization: getCookie('accessToken'),
          },
        })
        .then((res) => {
          console.log('삭제완료!');
        })
        .then((res) => handleRefresh())
        .catch((err) => console.log(err));
    }
  };

  return (
    <SectionWrapper key={data.placeId} onMouseEnter={onMouseHandler} onMouseLeave={onMouseHandler}>
      <PlaceInfoBox
        onClick={() => {
          handleGeoCode(data.latitude, data.longitude);
          handleZoom();
        }}
      >
        <div className='location-number__container'>
          <h5 className='location-number'>{idx + 1}</h5>
        </div>
        <div className='place-info__main'>
          <PlaceInfoContainer>
            <h5 className='location-name'>{data.placeName}</h5>
            <p className='location-address'>{data.placeAddress}</p>
          </PlaceInfoContainer>
          <PlaceAddingButtons>
            {/*<button>*/}
            {/*    {clockSvg}*/}
            {/*    Add time*/}
            {/*</button>*/}
            <button
              onClick={() => {
                handleExpenseModal();
                setCurrentDate(planDate);
                setCurrentPlace(data.placeName);
                setCurrentPlaceId(data.placeId);
              }}
            >
              {moneySvg}
              Add cost
              {data.expenses ? data.expenses.price : 'Add Cost'}
            </button>
          </PlaceAddingButtons>
        </div>
      </PlaceInfoBox>
      <PlanDeleteContainer className='delete__container '>
        <button onClick={() => handleDeletePlan(data.placeId)}>{deleteSvg}</button>
        {/* {delButtonIsShow ? (
          <button onClick={() => handleDeletePlan(data.placeId)}>{deleteSvg}</button>
        ) : null} */}
      </PlanDeleteContainer>
    </SectionWrapper>
  );
};

export default SinglePlan;
