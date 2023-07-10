import React, { useState } from 'react'
import Chat from './Chat';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { convertMySqlDateToReadable } from '../utils/helpers';
import { AppImages } from '../Asset/images/image';
import UnsubModal from './UnsubModal';
import RejectModal from './RejectModal';
import BaseApi from '../api/BaseApi';
const Main = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isUnsubModalOpen, setIsUnsubModalOpen] = useState(false);
  const [data, setData] = useState(null)
  const [isRequestInProgress, setIsRequestInProgress] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [isRejectable, setIsRejectable] = useState(true)
  const [isUnsubscribable, setIsUnsubscribable] = useState(true)
  const ids = searchParams.get('id').split('-')?.map(i => parseInt(i))
  const queryId = ids[0]
  const markerId = ids[1]
  const options = {
    googlePlayAppUrl: "https://play.google.com/store/apps/details?id=com.plabesk.onecall&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1",
    appStoreAppUrl: "https://apps.apple.com/us/app/one-call-app/id1524346082",
    baseVideoUrl: "https://www.youtube.com/embed/dZVvz_mX_Ro"
  }

  useEffect(() => {
    if(data === null && queryId && markerId) {
      // log page load
      BaseApi.logQPageLoad({ markerId, queryId })
      BaseApi.updateLeadAsRead({ markerId, queryId })

      setIsRequestInProgress(true)
      BaseApi.getSingleLead({ queryId }).then(res => {
        if(res.data.status === 200) {
          setData(res.data.data)
        }
      }).finally(() => {
        setIsRequestInProgress(false)
      })
    }
  }, [data, markerId, queryId])

  if(ids.length !== 2 || ids.filter(id => typeof id !== 'number' || isNaN(id)).length !== 0) {
    return (
      <div className='flex h-screen'>
        <div className='m-auto'>
          <span>Not Found</span>
        </div>
      </div>
    )
  }

  const handleRejectClick = e => {
    e.preventDefault()
    BaseApi.rejectLead({ markerId, queryId })
    setIsRejectable(false)
    setIsOpen(false)
  }

  const handleUnsubClick = e => {
    e.preventDefault()
    BaseApi.unsubscribeLeads({ markerId })
    setIsUnsubscribable(false)
    setIsUnsubModalOpen(false)
  }

  const handleClickOnCallNow = e => {
    BaseApi.logQClickedOnCallNow({ markerId, queryId })
    window.location.href = `tel:${data?.from}`
  }

  if(isRequestInProgress) {
    return (
      <div className='flex h-screen'>
        <div className='m-auto'>
          <img src={AppImages.loading} alt="loading" className='w-[50px]' />
        </div>
      </div>
    )
  }

  if(!isRequestInProgress && data === null) {
    return (
      <div className='flex h-screen'>
        <div className='m-auto'>
          <p>Something went wrong. Please try again!</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="w-[100%]">
        <h1 className="font-bold sm:font-bold text-xl sm:text-3xl text-center py-2 my-4">
          LEAD DETAILS
        </h1>

        <div className="w-[90%] m-auto rounded-md p-[5.15vw] mb-[3.55vw] border-[1px] border-[#ccc]">
          <div className="pb-[10px] border-b border-gray-200 mb-[5px]">
            <div className="mb-[5px] flex justify-between">
              <div className="sm:text-3xl">
                <span>Lead#</span> <span>{data?.id}</span>
              </div>
              <div className="text-[14px] bg-[#e9f2ff] px-[10px] py-[3px] border-[1px] rounded-2xl border-blue text-blue ">{data?.category}</div>
            </div>
            <div className="flex justify-between">
              <div>
                <span className="text-blue text-[14px] font-bold">{data?.status}</span>
              </div>
              <div>
                <span className="sm:text-3xl text-[14px]">{convertMySqlDateToReadable(data?.datetime)}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <button
                // id="lead_view_btn"
                style={{ display: "none" }}
                className="bg-[#09dc00] border-[1px] border-[#09dc00] color-[#fff]"
              >
                View
              </button>
            </div>
          </div>
          <div className="p-[2%]">
            <div>
              <iframe
                className="w-[100%] h-[200px] sm:h-[300px] border-[100%] border-2"
                src={options.baseVideoUrl}
                title="YouTube video player"
              ></iframe>
            </div>

            <h4 className="text-[14px] font-bold sm:font-bold my-[9px]">
              Description:
            </h4>
            <Chat queryMessages={data?.queryMessages ?? []} />
          </div>
          <div className='my-4'>
            <a 
              className='block w-full py-2 bg-green-600 rounded-full text-white font-bold text-center cursor-pointer' 
              rel='noreferrer'
              onClick={handleClickOnCallNow} 
            >
              Call Now
            </a>
          </div>
          {isRejectable && 
            <>
                <h3 className="text-center text-xl font-bold sm:text-3xl sm:font-bold my-6">
                  OR
                </h3>
                <div>
                  <a
                    onClick={() => setIsOpen(true)}
                    className="text-[#999] underline text-[12px] my-1 flex text-center mx-[10px] justify-center cursor-pointer"
                  >
                    Reject this lead
                  </a>
                </div>
            </>
          }
          <div className="bg-[#ddd] rounded-lg pb-[7px] font-semibold text-[13px] sm:text-[22px] text-center">
            <div className="p-[15px]">
              OneCallApp per ayein
              <br />
              Apna karobar barhayein!
            </div>
            <div className="w-[100%] inline-flex justify-center items-center pl-[10px]">
              <div>
                <a 
                  href={options.googlePlayAppUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <img
                    src={AppImages.googlePlay}
                    alt=""
                    className="w-[80%]"
                  />
                </a>
              </div>
              <div>
                <a 
                  href={options.appStoreAppUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <img
                    src={AppImages.apple}
                    className="w-[80%]"
                  />
                </a>
              </div>
            </div>
          </div>
          {isUnsubscribable && 
            <div>
              <span
                onClick={() => setIsUnsubModalOpen(true)}
                className="text-[#999] text-[12px] underline my-1 flex text-center mx-[10px] justify-center cursor-pointer"
              >
                Click here to Unsubscribe
              </span>
            </div>
          }
        </div>
      </div>

      <RejectModal 
        isOpen={modalIsOpen}
        onClose={() => setIsOpen(false)}
        onReject={handleRejectClick}
      />

      <UnsubModal 
        isOpen={isUnsubModalOpen}
        onClose={() => setIsUnsubModalOpen(false)}
        onUnsubscribe={handleUnsubClick}
      />
    </div>
  );
}

export default Main