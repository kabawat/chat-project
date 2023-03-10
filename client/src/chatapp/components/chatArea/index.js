import React, { useEffect } from 'react'
import { Button, Image, ContextAction } from '../../../style'
import { ChatBox, Massage, MassageContaienr, ChatDp, Msg, Time, ContextContainer, HiddenInput, MassageOuter } from '../style'
import dp from '../../../assets/user_dp/dp1.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { MdContentCopy, MdOutlineAddReaction } from 'react-icons/md'
import { AiOutlineStar } from 'react-icons/ai'
import { HiReply } from 'react-icons/hi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { TbArrowForwardUp } from 'react-icons/tb'
import { currentChat, deleteMsg } from '../../../redux/action'
import { useRef } from 'react'
const Chat = ({ curItem }) => {
    const date = new Date(curItem.time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const id = `_${new Date(curItem.time).getTime()}`
    return (
        <ChatBox isMe={curItem.isMe} >
            <ChatDp>
                <Image src={dp} />
            </ChatDp>
            <MassageOuter onContextMenu={curItem.handaleContextMenu} isMe={curItem.isMe}>
                <Massage isMe={curItem?.isMe} >
                    <Msg>
                        {curItem?.massage}
                    </Msg>
                    <Time>
                        {date}
                    </Time>
                </Massage>
                <HiddenInput id={id} />
            </MassageOuter>
        </ChatBox>
    )
}

const ChatArea = () => {
    const Dispatch = useDispatch()
    const { chatMassage, receiverProfile } = useSelector(state => state)
    const [conActive, setConActive] = useState(false)
    const [conTextMsg, setConTextMsg] = useState()
    const innerChatArea = useRef(null)
    const [mouse, setMouse] = useState({
        x: 0,
        y: 0
    })

    useEffect(() => {
        if (receiverProfile) {
            Dispatch(currentChat(receiverProfile.user))
        }
    }, [Dispatch, receiverProfile])

    const handaleContextMenu = (event) => {
        const _id = event.target.id.split('_')[1]
        setConTextMsg(new Date(parseInt(_id)))
        event.preventDefault()
        const innerSize = innerChatArea.current.clientWidth
        if ((event.pageX - 400) + 190 > innerSize) {
            setMouse({
                x: event.pageX - 190,
                y: event.pageY
            })
        } else {
            setMouse({
                x: event.pageX,
                y: event.pageY
            })
        }
        setConActive(false)
        setTimeout(() => {
            setConActive(true)
        }, 100)
    }

    window.addEventListener('click', () => {
        setConActive(false)
    })

    const hadaleDeleteMsg = () => {
        const newMsgList = chatMassage.filter((curMsg) => (conTextMsg.getTime() !== new Date(curMsg.time).getTime()) ? true : false
        )
        Dispatch(deleteMsg(newMsgList))
    }

    // scroll 
    const scroll = useRef(null)
    useEffect(() => {
        scroll.current.scrollIntoView()
    }, [chatMassage])
    return (
        <MassageContaienr ref={innerChatArea}>
            <ContextContainer active={conActive} left={mouse.x} top={mouse.y}>
                <ContextAction>
                    <Button>
                        <HiReply />
                        <span>Reply</span>
                    </Button>
                </ContextAction>
                <ContextAction>
                    <Button>
                        <MdContentCopy />
                        <span>Copy</span>
                    </Button>
                </ContextAction>
                <ContextAction>
                    <Button>
                        <MdOutlineAddReaction />
                        <span>React to massage</span>
                    </Button>
                </ContextAction>
                <ContextAction>
                    <Button>
                        <TbArrowForwardUp />
                        <span>Forword</span>
                    </Button>
                </ContextAction>
                <ContextAction>
                    <Button>
                        <AiOutlineStar />
                        <span>Star</span>
                    </Button>
                </ContextAction>
                <ContextAction>
                    <Button onClick={hadaleDeleteMsg}>
                        <RiDeleteBinLine />
                        <span>Delate</span>
                    </Button>
                </ContextAction>
            </ContextContainer>
            {
                chatMassage && chatMassage.map((curItem, index) => {
                    return <Chat curItem={{ ...curItem, handaleContextMenu }} key={index} />
                })
            }
            <div ref={scroll} id="scroll"></div>
        </MassageContaienr>
    )
}

export default ChatArea
