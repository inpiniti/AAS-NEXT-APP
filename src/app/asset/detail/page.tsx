import { PaperClipIcon } from '@heroicons/react/20/solid'

export default function Detail() {
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-7xl'>
        {/* 상세정보 */}
        <div className="px-4 sm:px-0">
            <h3 className="text-baSse font-semibold leading-7 text-gray-900">타이타닉</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">seagoingVessel</p>
        </div>
        <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">선적</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">영국</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">모항</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">리버풀(Liverpool)</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">선급</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">올림픽급 여객선(Olympic class)</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">소유주</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">화이트 스타 해운(White Star Line)</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">길이</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">269.1m</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">폭</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">28m</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">높이</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">53.3m</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">배수량</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">52,310t</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">총 톤수</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">46,328 GRT</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">최대 속도</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">23노트 (43㎞/h)</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">굴뚝 수</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">4</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">마스트 수</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">2</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">통신 시스템</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">밤에는 3,200km까지 연락 범위 확대.</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">무선호출 부호</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">MGY</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">재질</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">강철</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">길이</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">269.1m</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">기관</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">스카치식 보일러 24기, 보조 5기, 레시프로 4기통 엔진 2기, 증기터빈 1기, 혼성 3축, 프로펠러 3기(좌, 우현 3날 프로펠러, 중앙프로펠러 3날 혹은 4날)</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">출력</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">46,000HP(설계) – 59,000HP(최대 출력)</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">최대 탑승 가능 인원</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">3,547명 (승선객, 승무원 모두 포함)</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">선실수(1st-class(1등실))</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">416</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">선실수(2st-class(2등실))</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">162</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">선실수(3st-class(3등실))</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">269</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">선실수(cabin area(전용실, 갑판실 등))</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">40</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">document</dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                        <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                        </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Download
                        </a>
                    </div>
                    </li>
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                        <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                        </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Download
                        </a>
                    </div>
                    </li>
                </ul>
                </dd>
            </div>
            </dl>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-0 mt-12">
        <h3 className="text-baSse font-semibold leading-7 text-gray-900">vessel 부품</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">component</p>
      </div>
      <div className='pb-10'>
        <div className="mx-auto max-w-7xl grid grid-cols-6 gap-4 py-2">
            <a href="#" className="relative block p-6 bg-rose-100 rounded-lg hover:bg-gray-100 drop-shadow-2xl">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-amber-950">보일러</h5>
                <p className="font-normal text-amber-950">DMXD</p>
                <div className="shrink-0">
                    <img className="" src="https://krb.co.kr/files/attach/images/6939/834/008/7b99e5cd458775feaea8c1124a430461.png" alt="ChitChat Logo" />
                </div>
                <p className="font-normal absolute text-green-800 bottom-5 right-5">자산 연결됨</p>
            </a>
            <a href="#" className="relative block p-6 bg-rose-200 rounded-lg hover:bg-gray-100 drop-shadow-2xl">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">압축기</h5>
                <p className="font-normal text-gray-700 ">3.9 천연가스 터보압축기</p>
                <div className="shrink-0">
                    <img className="" src="https://www.h2news.kr/data/photos/20201148/art_16063573983921_24ab6a.png" alt="ChitChat Logo" />
                </div>
                <p className="font-normal absolute text-green-600 bottom-5 right-5">자산 연결됨</p>
            </a>
            <a href="#" className="relative block p-6 bg-cyan-300 rounded-lg hover:bg-gray-100 drop-shadow-2xl">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">발전기</h5>
                <p className="font-normal text-gray-700">3 MW 다이나모미터</p>
                <div className="shrink-0">
                    <img className="" src="https://m.tool-line.co.kr/web/product/big/202107/220c562fb17d0063a5858aa1966b5825.png" alt="ChitChat Logo" />
                </div>
                <p className="font-black absolute text-red-500 bottom-5 right-5">자산 연결되지 않음</p>
            </a>
            <a href="#" className="relative block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">펌프</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <div className="shrink-0">
                    <img className="" src="https://static.wixstatic.com/media/ccfcdb_6f16f1d76f86486d93ebedeb5f6ee081~mv2.png/v1/fill/w_918,h_656,al_c,q_90,enc_auto/md%20f.png" alt="ChitChat Logo" />
                </div>
                <p className="font-normal absolute text-red-300 bottom-5 right-5">자산 연결되지 않음</p>
            </a>
            <a href="#" className="relative block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">배관재</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <div className="shrink-0">
                    <img className="" src="https://png.pngtree.com/png-clipart/20220927/original/pngtree-3dc4d-three-dimensional-metal-pipe-water-pipe-png-image_8633875.png" alt="ChitChat Logo" />
                </div>
                <p className="font-normal absolute text-red-300 bottom-5 right-5">자산 연결되지 않음</p>
            </a>
            <a href="#" className="relative block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">밸브재</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <div className="shrink-0">
                    <img className="" src="https://blog.kakaocdn.net/dn/lGDXw/btrqMkM7zxs/Luk2oqWDMSaogJr6BhjXJ0/img.png" alt="ChitChat Logo" />
                </div>
                <p className="font-normal absolute text-red-300 bottom-5 right-5">자산 연결되지 않음</p>
            </a>
            <a href="#" className="relative block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">보온재</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <div className="shrink-0">
                    <img className="" src="https://cdn.011st.com/11dims/resize/220/11src/product/5264530813/L300.png?407000000" alt="ChitChat Logo" />
                </div>
                <p className="font-normal absolute text-red-300 bottom-5 right-5">자산 연결되지 않음</p>
            </a>
            <a href="#" className="relative block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">벽면재</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">(주)BIP WALL PANEL Standard wall panel system</p>
                <div className="shrink-0">
                    <img className="" src="https://ko.wiskindcleanroom.com/uploadfile/202207/27/36627e869b674f1cad3d941958322736_medium.png" alt="ChitChat Logo" />
                </div>
                <p className="font-normal absolute text-red-300 bottom-5 right-5">자산 연결되지 않음</p>
            </a>
        </div>
      </div>
    </div>
  )
}
